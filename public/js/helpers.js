
String.prototype.method = function(){
	var m = this;
	return function( obj ){
		return obj[m].call( obj );
	};
};
String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.humanize = function(){
	if( this.substr(0,3) === 'is_' ){
		return this.substr(3).humanize() + "?";
	}
	return this.split('_').map( "capitalize".method() ).join('-');
};

var util = {};
util.compare = function(a, b){
	if( a > b ) return -1;
	if( a < b ) return 1;
	return 0;
}
util.sorter = function(k,dir){
return function(a,b){
	return util.compare(a[k],b[k]) * (dir==="desc" ? -1 : 1);
}}
util.stringify = function(obj, k){
	if( obj === true || obj === false ){
 		return  ( k ? ( k + ": ") : "" ) + ( obj ? "yes" : "no" )
	}
	if( obj instanceof Array ){
        obj = '[' + obj.map( function(e,i){ return util.stringify(e); } ) + ']';
    }
    else if( typeof obj === 'object' ){
		var result = [];
		Object.keys( obj ).forEach( function(nk){
			result.push( util.stringify(obj[nk], (k?(k+"."):"") + nk ) );
		});
		return result.join(', ');
	}
	if( k ) return k + ": " + obj;
	else return obj;
}
util.search_object = function(arr){
return function(obj){
	var keys = Object.keys( obj );
	var all = true;
	arr.forEach( function(s){
		var any = false;
		keys.forEach( function(k){
			if( ( obj[k] + "" ).search(s) !== -1 ) any = true;
		});
		all = all && any;
	});
	return all;
}}

var is_mobile = ((window.innerWidth > 560 ) ? false : true );

var calcScoreInPrecentage = function( score ){ return  (80/5) * score + 20 };

var calculateAspectRatioFit = function(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    if( maxWidth > 361 ){
    	return { width: srcWidth*ratio, height: srcHeight*ratio };
    }else {
		return { width: 360, height: 574 };
    }
}

var percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0x00 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0x00 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0x00 } } ];

var getColorForPercentage = function(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}

var screenSize = calculateAspectRatioFit( 320, 568, window.innerWidth, window.innerHeight );

