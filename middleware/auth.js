var jwt = require('koa-jwt')
	,	appGlobals = require('app/appGlobals');

module.exports = function *(next) {

	try {
		// var token = this.request.header['authorization'].split(" ")[1];
		var token = this.get('authorization').split(" ")[1]; // this.response.get
	} catch(err) {
		var user = this.request.fields;
		var token = jwt.sign(user, appGlobals.jwt_key);
		this.body = JSON.stringify({
			token: token,
			message: 'Success'
		});
		yield next;
	}

	if (token) {
		try {
  		var decoded = jwt.verify(token, appGlobals.jwt_key);
  		if(!this.body) {
  			this.body = JSON.stringify({
  				'Error': 'No response'
  			});
  		}
			// console.log(decoded);
  		yield next;
		} catch(err) {
			this.body = JSON.stringify({
				"Error": 'Invalid token'
			});
			// console.log(err);
		}
	}

}