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

var color_map = {

    pawprint:  { good: "rgba(255, 198, 59,1)",    bad: "red",     goodpane: "rgba(254,196,34,0.2)",     badpane: "rgba(254,196,34,0.2)",  from: 0.4, to: 0.3  },
    thriftness:{ good: "rgba(208, 207, 236,1)",   bad: "red",     goodpane: "rgba(53,40,20,0.2)",       badpane: "rgba(53,40,20,0.2)",    from: 0.5, to: 0.4  },
    wellbeing: { good: "rgba(247, 162, 120,1)",   bad: "red",     goodpane: "rgba(53,40,20,0.2)",       badpane: "rgba(53,40,20,0.2)",    from: 0.6, to: 0.5  },
    wisdom:    { good: "rgba(200, 233, 160,1)",   bad: "red",     goodpane: "rgba(254,95,85,0.2)",      badpane: "rgba(254,95,85,0.2)",   from: 0.7, to: 0.6  },
    community: { good: "rgba(46, 190, 98,1)",     bad: "red",     goodpane: "rgba(156,210,166,0.2)",    badpane: "rgba(156,210,166,0.2)", from: 0.8, to: 0.7  },
    fitness:   { good: "rgba(208, 207, 236,1)",   bad: "red",     goodpane: "rgba(53,40,20,0.2)",       badpane: "rgba(53,40,20,0.2)",    from: 0.9, to: 0.8  }
};

var donut = function( w, h, scores ){

    var width = w, height = h, radius = Math.min(width, height) / 2;
    var pie = d3.layout.pie().sort(null).value(function(d) { return d; });

    var svg = d3.selectAll("svg.donut").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    for( var k in color_map ){
        var arc = d3.svg.arc().outerRadius(radius * color_map[k].from).innerRadius(radius * color_map[k].to);
        var s = Math.min(Math.abs(scores[k])+1,6);
        var g = svg.selectAll(".arc." + k )
                   .data(pie([s,6-s]))
                .enter().append("g")
                    .attr("class", "arc " + k);

        g.append("path").attr("d", arc)
                .style("fill", function(d, i) { return ((scores[k] < 0) ? [ color_map[k].bad, "rgba(53, 40, 42,0.4)" ] : [ color_map[k].good, "rgba(53, 40, 42,0.4)" ] )[i] })
                .style("stroke", function(d,i){ return "white" })
    }

};

var render_meerkat = function( meerkat ){
    var images = meerkat_to_images( meerkat );
    var baseUrl = config.assetServer();
    var img, e;

    e = document.createElement('div');
    e.className = "meerkat";
    for( var i=0; i<meerkat_images.length; i++ ){
        if( images.indexOf( meerkat_images[i] ) !== -1  || (meerkat_images[i].substr(0,6+meerkat.skin.meerkat.length) === "skins/" + meerkat.skin.meerkat)  ){
            img = document.createElement('img');
            img.src = baseUrl + "meerkats/" + meerkat_images[i];
            var anim = meerkat_images[i].split('_');
            if( anim.length > 1 ){
                img.className = "anim" + anim[1] + "of" + anim[2].replace('.png', '');
            }
             e.appendChild( img );
        }
    }
    var $meerkatContainer = $('.meerkat_container');
    $meerkatContainer.html('');
    $meerkatContainer.append( e );
    donut( 150, 150, meerkat.scores );
};

var quest_showing = false;
var quest_list_showing = false;
var quest_list_quest_showing = false;
var show_quest = function(){

    if( !quest_list_quest_showing && !quest_list_showing && !quest_showing && api.meerkat.quests.awaiting.length > 0 ){
        quest_showing = true;
        var q = api.meerkat.quests.awaiting[0];
        $('.pop_up.quest h1').text( q.title );
        $('.pop_up.quest p').text( q.description );
        $('.pop_up.quest').addClass('visible');
    } else {
        setTimeout( show_quest, 5000 );
    }

};

$('.btn.accept').click( function(){
    quest_showing = false;
    var q = api.meerkat.quests.awaiting[0];
    api.meerkat.quests.accepted.push( q );
    api.meerkat.quests.awaiting = api.meerkat.quests.awaiting.slice(1);
    $('.pop_up.quest').removeClass('visible');
    setTimeout( show_quest, 5000 );
    api.save();
});

$('.btn.decline').click( function(){
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
    var s = d3.select('.pop_up.quest_list').selectAll('li').data( api.meerkat.quests.accepted );
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

$('.btn.complete').click( function(){
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
});

$('.btn.forfeit').click( function(){
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

$('.ui_button.quests').click(function(){
    if( !quest_list_showing && !quest_showing ){
        quest_list_showing = true;
        $('.pop_up.quest_list').addClass('visible');
        render_accepted();
    }
});

$('.close').click( function(){
   $('.pop_up').removeClass('visible');
   quest_list_showing = false;
   quest_list_quest_showing = false;
   quest_showing = false;
});

$('div.meerkat').click( function(){
   $('.pop_up').removeClass('visible');
   quest_list_showing = false;
   quest_list_quest_showing = false;
   quest_showing = false;
});

var auto_refresh = function(){
    if( !api.saving ){
        api.get("meerkats/" + api.meerkat.id, function(data){
            api.meerkat = data;
        });
        setTimeout( auto_refresh, 15000 );
    }
};