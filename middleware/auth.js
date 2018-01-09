var jwt = require('koa-jwt')
	,	appGlobals = require('app/appGlobals')
  , paths = appGlobals.paths
  , path = require('path')
	,	Credential = require(path.join(paths.modelsDir, 'credentials.model'));

var tokenInHeader = false;

module.exports = function *(next) {
  if (this.request.header['authorization']) {
  	try {
  		var token = this.request.header['authorization'].split(' ')[1];
  		var decoded = jwt.verify(token, appGlobals.jwt_key);
  		this.user = decoded;

  		if (decoded.username == this.request.fields.username){
	  		var username = decoded.username;

	  		var query = Credential.findOne({
	  			'username': username
	  		}).then(function(result){
					if (!result) {
						return {
							'error': 'user not found'
						};	
					} else {
						return {
							'status': 'success'
						}
					}
				}).catch(function(err){
					return {
						'mongo error code': err.code,
						'mongo error message': 	err.errmsg
					};
				});

				var response = yield query;

				if (response.status == 'success') {
		    	yield next;
				}
			} else {
		    if(!this.body) {
		    	this.body = {
		    		'error': 'no response'
		    	};
		    }
		  }
  	} catch(err) {
  		// console.log(err.name, ' : ', err.message);
  		console.log(err);
  		this.user = undefined;
  		this.body = {
  			'error': {
  				'name': err.name,
  				'message': err.message
  			}
    	};
		  // yield next;
  	}
	} else {
  	this.user = undefined;
    yield next;
    if(!this.body) {
	  	this.body = {
	  		'error': 'no response'
	  	};
	  }
	}

	// try {
	// 	var token = this.request.header['authorization'].split(" ")[1];
	// 	if(token != 'undefined') {
	// 		tokenInHeader = true;
	// 	}
	// 	// var token = this.get('authorization').split(" ")[1]; // this.response.get
	// } catch(err) {
	// 	var user = this.request.fields;
	// 	var token = jwt.sign(user, appGlobals.jwt_key);
	// 	this.body = JSON.stringify({
	// 		token: token,
	// 		message: 'Success'
	// 	});
	// 	// yield next;
	// }

	// if (tokenInHeader) {
	// 	if (token) {
	// 		console.log('in if token');
	// 		try {
	//   		var decoded = jwt.verify(token, appGlobals.jwt_key);
	//   		if(!this.body) {
	//   			this.body = JSON.stringify({
	//   				'Error': 'No response'
	//   			});
	//   		}
	// 			// console.log(decoded);
	//   		yield next;
	// 		} catch(err) {
	// 			console.log(err);
	// 			this.body = JSON.stringify({
	// 				"Error": 'Invalid token'
	// 			});
	// 		}
	// 	}
	// }

}