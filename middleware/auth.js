var jwt = require('koa-jwt')
	,	appGlobals = require('app/appGlobals');

module.exports = function *(next) {

	try {
		console.log('Keys ' + Object.keys(this.request.fields));
		var token = this.request.header['authorization'].split(" ")[1];
		// console.log('Token ' + token);
		// var token = this.get('authorization').split(" ")[1]; // this.response.get
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
			// console.log('Decoded ' + decoded);
			// console.log('Token ' + token);
			// console.log('Keys ' + Object.keys(this.request.fields));
  		yield next;
		} catch(err) {
			this.body = JSON.stringify({
				"Error": 'Invalid token'
			});
			console.log(err);
		}
	}

}