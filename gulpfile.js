var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var shell = require('shelljs');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var taskListing = require('gulp-task-listing');
var imageResize = require('gulp-image-resize');

// Add a task to render the output
gulp.task('help', taskListing);

// Compile less
gulp.task('less', function() {
  return gulp.src('./less/index.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function(){
    shell.ls('./public/assets/meerkats/').forEach( function( dir ){
        shell.ls( './public/assets/meerkats/' + dir ).forEach(function( d ){
            shell.ls( './public/assets/meerkats/' + dir + '/' + d ).forEach(function( i ){
                console.log( 'Resizing: ./public/assets/meerkats/' + dir + '/' + d + '/' + i );
                  gulp.src( __dirname + '/public/assets/meerkats/' + dir + '/' + d + '/' + i )
                    .pipe(imageResize({ 
                        width : 640,
                        height : 1136,
                        crop : false,
                        upscale : false
                    }))
                    .pipe(gulp.dest(__dirname + '/public/assets/smaller/'));
            });
        });
    });
});

// Start and watch server.js
gulp.task('server', function(){
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: { 'NODE_ENV': 'development' }
	});
});

// Watch die shizzle
gulp.task('watch', function() {
  gulp.watch('./less/*.less', ['less']);
});

gulp.task('default', ['server', 'less', 'watch']);






