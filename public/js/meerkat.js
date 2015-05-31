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
    happiness: { good: "rgba(32,44,44,1)",      bad: "red",     goodpane: "rgba(32,44,44,0.2)",       badpane: "rgba(32,44,44,0.2)",  from: 0.4, to: 0.3  },
    wisdom:    { good: "rgba(254,95,85,1)",     bad: "red",     goodpane: "rgba(254,95,85,0.2)",      badpane: "rgba(254,95,85,0.2)", from: 0.5, to: 0.4  },
    community: { good: "rgba(156,210,166,1)",   bad: "red",     goodpane: "rgba(156,210,166,0.2)",    badpane: "rgba(156,210,166,0.2)", from: 0.6, to: 0.5  },
    fitness:   { good: "rgba(53,40,20,1)",      bad: "red",     goodpane: "rgba(53,40,20,0.2)",       badpane: "rgba(53,40,20,0.2)", from: 0.7, to: 0.6  },
    pawprint:  { good: "rgba(254,196,34,1)",    bad: "red",     goodpane: "rgba(254,196,34,0.2)",     badpane: "rgba(254,196,34,0.2)", from: 0.8, to: 0.7  }
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
                .style("fill", function(d, i) { return ((scores[k] < 0) ? [ color_map[k].bad, "rgba(255,255,255,0.7)" ] : [ color_map[k].good, "rgba(255,255,255,0.7)" ] )[i] })
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
    document.body.appendChild( e );
    donut( 100, 100, meerkat.scores );
};


