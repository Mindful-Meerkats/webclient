var api = {};
api.server = config.apiServer();
api.get = function( url, cb ){
   $.ajax({
	  url: api.server + url,
	  dataType: 'json',
	  beforeSend: function( xhr ){
	  	xhr.setRequestHeader("Authorization", "Bearer " + api.token);
	  },
	  success: function( data ){
		if(cb) cb( data );
	  },
	  error: function( xhr, status, err ){
		console.error( url, status, err.toString() );
	  }
	});
};
api.post = function( url, data, cb ){

	$.ajax({
	  url: api.server + url + (data.id ? '/' + data.id : ''),
	  dataType: 'json',
	  method: 'post',
	  data: data,
	  beforeSend: function( xhr ){
	  	xhr.setRequestHeader("Authorization", "Bearer " + api.token);
	  },
	  success: function( data ){
		cb();
	  },
	  error: function( xhr, status, err ){
		alert( status + ": " + err.toString() );
	  }
	});
};
api.put = function( url, data, cb ){
	$.ajax({
	  url: api.server + url,
	  dataType: 'json',
	  method: 'PUT',
	  data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
	  beforeSend: function( xhr ){
	  	xhr.setRequestHeader("Authorization", "Bearer " + api.token);
	  },
	  success: function( data ){
		cb();
	  },
	  error: function( xhr, status, err ){
		alert( status + ": " + err.toString() );
	  }
	});
};
api.del = function( url, cb ){
	$.ajax({
	  url: api.server + url,
	  method: 'delete',
	  beforeSend: function( xhr ){
	  	xhr.setRequestHeader("Authorization", "Bearer " + api.token);
	  },
	  success: function( data ){
		cb();
	  }.bind(this),
	  error: function( xhr, status, err ){
		alert( status + ": " + err.toString() );
	  }
	});
};
api.logout = function(){
	Cookies.remove('jwt');
    window.location.replace( "/login" );
};
api.saving = false;
api.save = function(){
    api.saving = true;
    api.put( "/meerkats/" + api.meerkat.id, api.meerkat, function(){
        api.saving = false;
        console.log('saved meerkat');
    });
};









