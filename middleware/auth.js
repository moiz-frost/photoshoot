var jwt = require('koa-jwt')
	,	appGlobals = require('app/appGlobals');

module.exports = function *(next) {
	// this.set('Access-Control-Allow-Origin', '*');
	this.response.header['Access-Control-Allow-Origin'] = '*';
	console.log('inside');

	try {
		var token = this.request.header['authorization'].split(" ")[1];
		// var token = this.get('authorization').split(" ")[1]; // this.response.get
		console.log('Inside');
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
			console.log(decoded);
			console.log(token);
  		yield next;
		} catch(err) {
			this.body = JSON.stringify({
				"Error": 'Invalid token'
			});
			console.log(err);
		}
	}

}