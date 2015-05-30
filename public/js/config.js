var config = {};

config.env = function(){
    var href = window.location.href;
	if( href.indexOf('localhost') !== -1  ){
		return 'development';
	}else if( href.indexOf('suricates') !== -1 ) {
		return 'accept';
	}else {
		return 'production'; 
	}
};

config.apiServers = {
    development: 'http://localhost:1337',
    accept: 'http://api.suricates.nl',
    production: 'http://api.mindful-meerkats.com',
    default: 'http://localhost:1337'
};
    

config.apiServer = function(){
    return config.apiServers[ config.env() ] || config.apiServers.default;
};

config.authServers = {
    development: 'http://localhost:4444',
    accept: 'http://auth.suricates.nl',
    production: 'http://auth.mindful-meerkats.com',
    default: 'http://localhost:4444'
};
    

config.authServer = function(){
    return config.authServers[ config.env() ] || config.authServers.default;
};

config.assetServers = {
    development: 'http://localhost:9999/',
    accept: 'http://assets.suricates.nl/',
    production: 'http://assets.mindful-meerkats.com/',
    default: 'http://localhost:9999/'
};
    
config.assetServer = function(){
    return config.assetServers[ config.env() ] || config.assetServers.default;
};
 

