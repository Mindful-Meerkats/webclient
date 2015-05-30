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
	  method: 'put',
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


// detect token
// api.token = window.location.hash.substr(1);
// window.location.hash = "";
// if( api.token === "" ) api.token = Cookies.get('jwt') || "";
// if( api.token === "" ) window.location.replace( "/login" );
// else {

// 	Cookies.set('jwt', api.token, { expires: 1 });

// 	// fetch user record
// 	$.ajax({
// 	 	url: api.server ,
// 	 	dataType: 'json',
// 	    beforeSend: function( xhr ){
// 		  	xhr.setRequestHeader("Authorization", "Bearer " + api.token);
// 	    },
// 	    success: function( data ){
// 	    	$('h4.screen_name').text( data.account.screen_name );
// 	    },
// 	    error: function( xhr, status, err ){
// 			console.error( url, status, err.toString() );
// 		}
// 	});

// }



