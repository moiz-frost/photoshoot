var appGlobals = require('app/appGlobals')
	,	paths = appGlobals.paths
  , path = require('path')
  ,	bcrypt = require('bcrypt')
  ,	jwt = require('koa-jwt')
	,	Credential = require(path.join(paths.modelsDir, 'credentials.model'));


module.exports = {
	create: function *(next) {
		var username = this.request.fields.username;
		var plainPassword = this.request.fields.password;

		var query = bcrypt.hash(plainPassword, appGlobals.salt_rounds).then(function(hash){
			return new Credential({
				username: username,
				password: hash
			});
		}).then(function(credentials) {
			return credentials.save().then(function(credentials) {
				return {
					'status': 'saved'
				};
			}).catch(function(err) {
				console.log('Save Error :', err);
				return {
					'mongo error code': err.code,
					'mongo error message': 	err.errmsg
				};
			});
		}).then(function(dbResponse) {
			return dbResponse;
		}).catch(function(err) {
			console.log('Bcrypt Error:', err);
			return err.toString();
		});

		try {
			var response = yield query;
			this.body = response;
		} catch (err) {
			console.log('Create Error: ', err);
		}
		
		yield next;
	},

	login: function *(next) {
		var username = this.request.fields.username;
		var plainPassword = this.request.fields.password;


		var query = Credential.findOne({
			username: username
		}).then(function(credential){
			if (!credential) {
				return {
					'error': 'user not found'
				}
			} else {
				return bcrypt.compare(plainPassword, credential.password)
				.then(function(result) {
					var user = {
						'username': username,
					}, options = {
						expiresIn: '5m'
					}
					var token = jwt.sign(user, appGlobals.jwt_key);
					// TODO store jwt in model
					Credential.findOneAndUpdate(user, { 'token': token }).
					then(function(res) {
						// console.log(res);
					}).catch(function(err) {
						console.log(err);
					});
					return {
						'token': token
					};
				}).catch(function(err){
					console.log(err);
				});
			}
		}).catch(function(err){
			console.log(err);
			return {
				'mongo error code': err.code,
				'mongo error message': 	err.errmsg
			};
		});

		try {
			var response = yield query;
			this.body = response;
		} catch (err) {
			console.log('Login Error: ', err);
		}
	},

	logout: function *(next) {
		var username = this.request.fields.username;
		var plainPassword = this.request.fields.password;

		var user = {
			'username': username,
		}

		var query = Credential.findOneAndUpdate(user, { 'token': '' }).
		then(function(res) {
			// console.log(res);
			return {
				'status': 'success'
			}
		}).catch(function(err) {
			console.log(err);
			return {
				'mongo error code': err.code,
				'mongo error message': 	err.errmsg
			};
		});

		try {
			var response = yield query;
			this.body = response;
		} catch (err) {
			console.log('Logout Error: ', err);
		}
	},

	findAll: function *(next) {
		var username = this.request.fields.username;
		var query = Credential.findAll({
			username: username
		}).then(function(result){
			if (result.length === 0) {
				return JSON.stringify({
					'error': 'user not found'
				});	
			}
			return JSON.stringify(result);
		}).catch(function(err){
			return JSON.stringify(err.toJSON);
		});

		try {
			var response = yield query;
			this.body = response;
		} catch (err) {
			this.body = JSON.stringify(err.toJSON());
		}

		yield next;
	},

	findOne: function *(next) {
		var username = this.request.fields.username;
		var query = Credential.findOne({
			username: username
		}).then(function(result){
			if (!result) {
				return JSON.stringify({
					'error': 'user not found'
				});	
			}
			return JSON.stringify(result);
		}).catch(function(err){
			return JSON.stringify(err.toJSON);
		});

		try {
			var response = yield query;
			this.body = response;
		} catch (err) {
			this.body = JSON.stringify(err.toJSON());
		}

		yield next;
	},

	findOneAndUpdate: function *(next) {
		yield next;
	},

	findOneAndRemove: function *(next) {
		var username = this.request.fields.username;
		var query = Credential.findOneAndRemove({
			username: username
		}).then(function(result){
			if (!result) {
				return JSON.stringify({
					'Error': 'None found'
				});	
			}
			return JSON.stringify(result);
		}).catch(function(err){
			return JSON.stringify(err.toJSON);
		});

		try {
			var response = yield query;
			this.body = response;
		} catch (err) {
			this.body = JSON.stringify(err.toJSON());
		}

		yield next;
	},

	deleteOne: function *(next) {
		yield next;
	},

	deleteMany: function *(next) {
		var username = this.request.fields.username;
		var query = Credential.deleteMany({
			username: username
		}).then(function(result){
			if (!result) {
				return JSON.stringify({
					'Error': 'None found'
				});	
			}
			return JSON.stringify({
				'deleteCount': result.deletedCount
			});
		}).catch(function(err){
			return JSON.stringify(err.toJSON);
		});

		try {
			var response = yield query;
			this.body = response;
		} catch (err) {
			this.body = JSON.stringify(err.toJSON());
		}

		yield next;
	}
}