var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var taskListing = require('gulp-task-listing');

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






