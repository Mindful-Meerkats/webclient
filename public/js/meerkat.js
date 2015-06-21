var meerkat_images = [

    "pawprint/back1/-1.png",
    "pawprint/back1/+1.png",
    "pawprint/back1/0.png",
    "community/back1/+2.png",
    "community/back1/-1.png",
    "community/back1/+3.png",
    "community/back1/+1.png",

    "pawprint/front1/-1.png",
    "pawprint/front1/+1.png",
    "pawprint/front1/0.png",
    "wellbeing/front/-1.png",
    "wellbeing/front/-4.png",
    "wellbeing/front/+1.png",
    "wellbeing/front/-3.png",
    "wellbeing/front/-2.png",

    "thriftness/front2/+1.png",
    "thriftness/front2/0.png",
    "thriftness/front2/_1.png",

    "skins/default/backleg.png",

    "fitness/front1/-1.png",
    "fitness/front1/+1.png",
    "fitness/front1/0.png",

    "wisdom/front2/+1_4_5.png",
    "wisdom/front2/-1_3_3.png",
    "wisdom/front2/-1_2_3.png",
    "wisdom/front2/+1_5_5.png",
    "wisdom/front2/-1_1_3.png",
    "wisdom/front2/0.png",
    "wisdom/front2/+1_1_5.png",
    "wisdom/front2/+1_3_5.png",
    "wisdom/front2/+1_2_5.png",
    "happiness/front2/+1.png",
    "happiness/front2/0.png",
    "happiness/front2/_1.png",

    "skins/default/eyesfur.png",
    "skins/default/sweatthrift.png",
    "skins/default/eyes.png",
    "skins/default/headfur.png"

];

var image_cache = null;
var preload_images = function( f ){
    if( image_cache !== null ){ f(); return }
    image_cache = {};
    var baseUrl = config.assetServer();
    counter = meerkat_images.length;
    meerkat_images.forEach( function( fn ){
        var img = new Image();
        img.onload = function(){
            counter = counter - 1;
            if( counter === 0 ){
                f();
            }
        };
        img.src = baseUrl + 'meerkats/' + fn;
        image_cache[fn] = img;
    });
};


var meerkat_image_map = {};
var parse_image_url = function( url ){
    var parts = url.split("/");
    return {
        prop:  parts[0],
        stack: parts[1],
        score: parts[2].replace('.png','').split('_')[0]
    };
};

var add_image_map = function( url, map ){
    var px = parse_image_url( url );
    map[px.prop] = map[px.prop] || {};
    map[px.prop][px.score] = map[px.prop][px.score] || {};
    map[px.prop][px.score][px.stack] = map[px.prop][px.score][px.stack] || [];
    map[px.prop][px.score][px.stack].push( url );
};

for( var i=0; i<meerkat_images.length; i++ ) add_image_map( meerkat_images[i], meerkat_image_map );

var get_frames_of = function( prop, score ){
    if( !meerkat_image_map[prop] ) return [];
    var k,result;
    var images = [];

    if( score > 0 ){
        result = meerkat_image_map[prop]["+" + score];
        if( !result ) return get_frames_of( prop, score - 1  );
        for( k in result ) images = images.concat( result[k] );
        return images;
    }

    if( score < 0 ){
        result = meerkat_image_map[prop]["+" + score];
        if( !result ) return get_frames_of( prop, score + 1  );
        for( k in result ) images = images.concat( result[k] );
        return images;
    }

    if( score === 0 ){
        result = meerkat_image_map[prop]["0"];
        if( !result ) return [];
        for( k in result ) images = images.concat( result[k] );
        return images;
    }

};

var meerkat_to_images = function( meerkat ){
    var images = [];
    for( var prop in meerkat.scores ) images = images.concat( get_frames_of( prop, meerkat.scores[prop] ) );
    return images;
};

// new style
var color_map = {
    fitness:   { good: "darkblue" },
    wellbeing: { good: "#894498"  },
    wisdom:    { good: "#7C9FBD"  },
    community: { good: "#8D2044"  },
    thriftness:{ good: "#504D07"  },
    pawprint:  { good: "#EE8409"  },

};

// old style
var color_map = {
    pawprint:  { good: "rgba(255, 198, 59,1)"  },
    thriftness:{ good: "rgba(208, 207, 236,1)"  },
    wellbeing: { good: "rgba(247, 162, 120,1)"  },
    wisdom:    { good: "rgba(200, 233, 160,1)"  },
    community: { good: "rgba(46, 190, 98,1)"  },
    fitness:   { good: "rgba(208, 207, 236,1)"  }
};


// rainbow
var color_map = {
    fitness:   { good: "#cc0000" },
    wellbeing: { good: "#990a9c"  },
    wisdom:    { good: "#500a9c"  },
    community: { good: "#0a0d9c"  },
    thriftness:{ good: "#5b9c0a"  },
    pawprint:  { good: "#fae300"  }

};

// rainbow minus one purple
var color_map = {
    fitness:   { good: "#cc0000" },
    wellbeing: { good: "#990a9c"  },
    wisdom:    { good: "#0a0d9c"  },
    community: { good: "#5b9c0a"  },
    thriftness:{ good: "#fae300"  },
    pawprint:  { good: "#ed5f21"  }
};

// ralf rainbow
var color_map = {
    fitness:   { good:  "#5fc2f1" },
    wellbeing: { good: "#E3B505"   },
    wisdom:    { good: "#cfd40a"   },
    community: { good:  "#58cd3e" },
    thriftness:{ good:  "#0c5c7a" },
    pawprint:  { good: "#b84a49" }

};

// ralf rainbow resorted
var color_map = {
    fitness:   { good:    "#0c5c7a"},
    wellbeing: { good:  "#5fc2f1" },
    wisdom:    { good:  "#58cd3e"  },
    community: { good:  "#cfd40a"  },
    thriftness:{ good: "#E3B505"  },
    pawprint:  { good: "#b84a49" }

};


// ralf rainbow resorted keys
var color_map = {
    fitness:   { good:    "#0c5c7a"},
    wisdom: { good:  "#5fc2f1" },
    pawprint:    { good:  "#58cd3e"  },
    community: { good:  "#cfd40a"  },
    wellbeing:{ good: "#E3B505"  },
    thriftness:  { good: "#b84a49" }
};

var happiness = function( scores ){
    var total = 0, score = 0;
    for( var k in color_map ) total = total + Math.max( Math.min( scores[k], 5 ), -5 );
    total = Math.min( Math.max( total / 6, -5 ), 5 ) + 5; // total is now a value between 0 and 10
    score = total / 10;
    if( score < 0.25 ) return { style: 'bad', score: score };
    if( score < 0.50 ) return { style: 'ok', score: score };
    return { style: 'good', score: score };
};

var limit = function(a){
    return Math.max(Math.min(a,10),0);
}

var donut = function( w, h, scores ){

    d3.select("svg.donut").selectAll("g").remove();

    var width = w, height = h, radius = Math.min(width, height) / 2;
    var pie = d3.layout.pie().sort(null).value(function(d) { return d; });

    var svg = d3.select("svg.donut").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    Object.keys( color_map )
    /*.sort(function(a,b){
        if( scores[a] < scores[b] ) return 1;
        if( scores[a] > scores[b] ) return -1;
        return 0;
    })*/.forEach( function(k,i){
        var arc = d3.svg.arc().outerRadius(radius * ((i+5)/10)).innerRadius(radius * ((i+4)/10));
        var g = svg.selectAll(".arc." + k )
                   .data(pie([limit(scores[k]+5),10-limit(scores[k]+5)]))
                .enter().append("g")
                    .attr("class", "arc " + k)

        g.append("path").attr("d", arc)
                .style("fill", function(d, i) { return [ color_map[k].good, "rgba(0, 0, 0,0.2)" ][i] })
                .style("stroke", function(d,i){ return "rgba(0,0,0,0.5)" }).append("text").attr("d", arc ).text( k );;
    });

    var happy = happiness( scores );
    var clip = svg.append("defs")
    .append("clipPath")
    .attr("id","clip")
    .append("rect")
    .attr("width",200)
    .attr("height",200)
    .attr("x",-100)
    .attr("y",(radius*0.6*(0.5-happy.score)));


    svg.append("circle").attr("r", radius * 0.4 ).attr("fill", "grey").attr('clip-path',"url(#clip)");
    svg.append("text").attr("x", -20 ).attr("fill","white").attr("stroke", "black").attr("y", 8).text( Math.round(happy.score * 99) + "%" );


};



var render_meerkat_image = function( ctx, fn ){
   img = new Image();
   img.onload = function(){
        console.log( fn );
        if( !is_mobile ){
            ctx.drawImage(img, Math.random() * 25, Math.random()*25, 320, 568);
        }else {
            ctx.drawImage(img, Math.random() * 25, Math.random()*25, screenSize.width, screenSize.height);
        }

    };
    //img.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png"; //fn;
    img.src = fn;
};

var current_meerkat = null;
var start_render = function( meerkat ){
    var first = true;
    preload_images( function(){
        current_meerkat = meerkat;
        var loop = function(){
            render_meerkat( current_meerkat, !first );
            setTimeout( loop, 1000 );
            first = false;
        };
        loop();
    });
};

var render_meerkat = function( meerkat, skip_donut ){
    current_meerkat = meerkat;

    var images = meerkat_to_images( meerkat );
    var baseUrl = config.assetServer();
    var img, e;

    e = document.getElementById('meerkat_canvas');
    if( is_mobile ){
        e.width = screenSize.width;
        e.height = screenSize.height;
    }
    var ctx = e.getContext('2d');
    var animation_frame = Math.floor( Math.random() * 10 );

    for( var i=0; i<meerkat_images.length; i++ ){
        if( images.indexOf( meerkat_images[i] ) !== -1  || (meerkat_images[i].substr(0,6+meerkat.skin.meerkat.length) === "skins/" + meerkat.skin.meerkat)  ){
            var anim = meerkat_images[i].split('_');
            if( anim.length > 1 ){
                var max_anim = parseInt( anim[2].replace('.png', ''), 10);
                var cur_anim = parseInt(anim[1],10);
                if( ( animation_frame % max_anim ) + 1 === cur_anim ){
                    if( !is_mobile ){
                        ctx.drawImage( image_cache[meerkat_images[i]], 0, 0, 320, 568);
                    }else {
                        ctx.drawImage( image_cache[meerkat_images[i]], 0, 0, screenSize.width, screenSize.height);
                    }
                }
            } else if( anim.length === 1 ){
                if( !is_mobile ){
                    ctx.drawImage( image_cache[meerkat_images[i]], 0, 0, 320, 568);
                }else {
                    ctx.drawImage( image_cache[meerkat_images[i]], 0, 0, screenSize.width, screenSize.height);
                }

            }

        }
    }
    if( !skip_donut )  donut( 250, 250, meerkat.scores );
};

var quest_showing = false;
var stats_showing = false;
var quest_list_showing = false;
var quest_list_quest_showing = false;
var completed_showing = false;
var showing_anything_yet = ( !completed_showing && !stats_showing && !quest_list_quest_showing && !quest_list_showing && !quest_showing ) ? false : true;

var show_quest = function(){

    if( !quest_list_quest_showing && !quest_list_showing && !quest_showing && api.meerkat.quests.awaiting.length > 0 ){
        quest_showing = true;
        var q = api.meerkat.quests.awaiting[0];
        $('.pop_up.quest h1').text( q.title );
        $('.pop_up.quest p').text( q.description );
        $('.pop_up.quest .btn').show();
        $('.pop_up.quest').addClass('visible');
    } else {
        setTimeout( show_quest, 5000 );
    }

};

var show_stats = function(){
    if( !showing_anything_yet ){
        stats_showing = true;
        $('.pop_up.stats .stat_container').empty();
        for( var score in api.meerkat.scores ){
            var fill = calcScoreInPrecentage( api.meerkat.scores[ score ] );
            $('.pop_up.stats .stat_container').append(
                '<span class="label">'+ score +'</span><div class="stat '+ score +'"><span style="width:'+ fill +'%;" class="progress"></span><span class="percentage">'+ fill +'%</span></div>'
                );
            $('.pop_up.stats').addClass('visible');
        }
    }
};

var show_completed = function( quest ){
    if( !showing_anything_yet ){
        completed_showing = true;
        var q = quest;
        $('.pop_up.quest h1').text( q.title );
        $('.pop_up.quest p').text( q.completed_text );
        $('.pop_up.quest .btn').hide();
        $('.pop_up.quest').addClass('visible');


    }else {
        setTimeout(show_completed( quest ), 1000 );
    }
};

$('.donut').on('touchstart click', function( e ) {
    console.log( e );
    show_stats();
});

$('.btn.quest_me').on('touchstart click', function(){
    api.get('/quests/new/' + api.meerkat.id, function( data ){
        api.meerkat.quests.awaiting.push( data );
        $('.pop_up').removeClass('visible');
        quest_list_showing = false;
        quest_list_quest_showing = false;
        quest_showing = false;
        show_quest();
        api.save();
    });
});

$('.btn.accept').on('touchstart click', function(){
    quest_showing = false;
    var q = api.meerkat.quests.awaiting[0];
    api.meerkat.quests.accepted.push( q );
    api.meerkat.quests.awaiting = api.meerkat.quests.awaiting.slice(1);
    $('.pop_up.quest').removeClass('visible');
    setTimeout( show_quest, 5000 );
    api.save();
});

$('.btn.decline').on('touchstart click', function(){
    quest_showing = false;
    var q = api.meerkat.quests.awaiting[0];
    api.meerkat.quests.declined.push( q );
    api.meerkat.quests.awaiting = api.meerkat.quests.awaiting.slice(1);
    for( var k in q.penalty ){
       api.meerkat.scores[k] = api.meerkat.scores[k] + q.penalty[k];
   }
    $('.pop_up.quest').removeClass('visible');
    setTimeout( show_quest, 5000 );
    api.save();
});

var current_quest;
var render_accepted = function(){
    var s = d3.select('.pop_up.quest_list ul').selectAll('li').data( api.meerkat.quests.accepted );
    var handler = function( d ){
        quest_list_quest_showing = true;
        $('.pop_up.quest_list_quest h1').text( d.title );
        $('.pop_up.quest_list_quest p').text( d.description );
        $('.pop_up.quest_list_quest').addClass('visible');
        $('.pop_up.quest_list').removeClass('visible');
        current_quest = d;
    };
    s.text( function(d){ return d.title }).on('click', handler );
    s.enter().append('li').text( function(d){ return d.title }).on('click', handler );
    s.exit().remove();
};

$('.btn.complete').on('touchstart click', function(){
   quest_list_quest_showing = false;
   $('.pop_up.quest_list_quest').removeClass('visible');
   $('.pop_up.quest_list').addClass('visible');
   for( var k in current_quest.points ){
       api.meerkat.scores[k] = api.meerkat.scores[k] + current_quest.points[k];
   }
   var i = api.meerkat.quests.accepted.indexOf( current_quest );
   api.meerkat.quests.done.push( current_quest );
   api.meerkat.quests.accepted.splice(i,1);
   api.save();
   $('.pop_up').removeClass('visible');
   quest_list_showing = false;
   quest_list_quest_showing = false;
   quest_showing = false;
   render_meerkat( api.meerkat );
   show_completed( current_quest );
});

$('.btn.forfeit').on('touchstart click', function(){
   quest_list_quest_showing = false;
   $('.pop_up.quest_list_quest').removeClass('visible');
   $('.pop_up.quest_list').addClass('visible');
   for( var k in current_quest.penalty ){
       api.meerkat.scores[k] = api.meerkat.scores[k] + current_quest.penalty[k];
   }
   var i = api.meerkat.quests.accepted.indexOf( current_quest );
   api.meerkat.quests.declined.push( current_quest );
   api.meerkat.quests.accepted.splice(i,1);
   api.save();
   $('.pop_up').removeClass('visible');
   quest_list_showing = false;
   quest_list_quest_showing = false;
   quest_showing = false;
   render_meerkat( api.meerkat );
});

$('.ui_button.quests').on('touchstart click',function(){
    if( !quest_list_showing && !quest_showing ){
        quest_list_showing = true;
        $('.pop_up.quest_list').addClass('visible');
        render_accepted();
    }
});

$('.close').on('touchstart click', function(){
   $('.pop_up').removeClass('visible');
   quest_list_showing = false;
   quest_list_quest_showing = false;
   quest_showing = false;
   stats_showing = false;
});

$('div.meerkat').on('touchstart click', function(){
   $('.pop_up').removeClass('visible');
   quest_list_showing = false;
   quest_list_quest_showing = false;
   quest_showing = false;
});

var auto_refresh = function(){
    if( !api.saving ){
        api.get("meerkats/" + api.meerkat.id, function(data){
            api.meerkat = data;
            render_meerkat( api.meerkat );
        });
        setTimeout( auto_refresh, 15000 );
    }
};