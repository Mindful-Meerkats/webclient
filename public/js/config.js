var config = {};

config.env = function(){
	if( window.location.href.includes('localhost') ){
		return 'development';
	}else if( !window.location.href.includes('production') ) {
		return 'accept'
	}else {
		return 'production'
	}

};

config.apiServer = function(){
	var env = config.env();
	switch( env ){
		case 'development':
			return 'http://localhost:1337';
		case 'accept':
			return 'http://api.suricates.nl';
		case 'production':
			return 'http://api.production.suricates.nl';
		default:
			return 'http://localhost:1337';
	}
};

config.authServer = function(){
	var env = config.env();
	switch( env ){
		case 'development':
			return 'http://localhost:4444';
		case 'accept':
			return 'http://auth.production.suricates.nl';
		case 'production':
			return 'http://auth.suricates.nl';
		default:
			return 'http://localhost:4444';
	}
};