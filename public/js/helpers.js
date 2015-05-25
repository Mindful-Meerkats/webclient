
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

