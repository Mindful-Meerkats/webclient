var meerkat_images = [
    
    "paw_print/back1/-1.png", 
    "paw_print/back1/+1.png", 
    "paw_print/back1/0.png", 
    "community/back1/+2.png", 
    "community/back1/-1.png", 
    "community/back1/+3.png", 
    "community/back1/+1.png", 
    
    "paw_print/front1/-1.png", 
    "paw_print/front1/+1.png", 
    "paw_print/front1/0.png", 
    "wellbeing/front/-1.png", 
    "wellbeing/front/-4.png", 
    "wellbeing/front/+1.png", 
    "wellbeing/front/-3.png", 
    "wellbeing/front/-2.png", 
  
    "thriftness/front2/+1.png", 
    "thriftness/front2/0.png", 
    "thriftness/front2/_1.png", 
  
    "fitness/front1/-1.png", 
    "fitness/front1/+1.png", 
    "fitness/front1/0.png",
    
    "wisdom/front2/+1_4.png", 
    "wisdom/front2/-1_3.png", 
    "wisdom/front2/-1_2.png", 
    "wisdom/front2/+1_5.png", 
    "wisdom/front2/-1_1.png", 
    "wisdom/front2/0.png", 
    "wisdom/front2/+1_1.png", 
    "wisdom/front2/+1_3.png", 
    "wisdom/front2/+1_2.png", 
    "happiness/front2/+1.png", 
    "happiness/front2/0.png", 
    "happiness/front2/_1.png", 
    
    "skins/default/eyes_fur.png", 
    "skins/default/sweat_thrift.png", 
    "skins/default/eyes.png", 
    "skins/default/back_leg.png", 
    "skins/default/head_fur.png"
    
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
            //img.className = "anim" + j + "of" + ix.length;
             e.appendChild( img );
        }
    }
    document.body.appendChild( e );
};
