var appGlobals = require('app/appGlobals')
	,	paths = appGlobals.paths
  , path = require('path')
  ,	bcrypt = require('bcrypt')
	,	Credential = require(path.join(paths.modelsDir, 'credentials.model'));


module.exports = {
	create: function *(next) {
		var plainPassword = this.request.fields.password;
		var username = this.request.fields.username;

		var responsePromise = bcrypt.hash(plainPassword, appGlobals.salt_rounds).then(function(hash){
			return new Credential({
				username: username,
				password: hash
			});
		}).then(function(credentials) {
			return credentials.save().then(function(credentials) {
				return JSON.stringify({
					'status': 'Saved successfully'
				});
			}).catch(function(err) {
				return JSON.stringify(err.toJSON());
			});
		}).then(function(dbResponse) {
			return dbResponse;
		}).catch(function(err) {
			return JSON.stringify(err.toJSON());
		});

		try {
			var response = yield responsePromise;
			this.body = response;
		} catch (err) {
			this.body = JSON.stringify(err.toJSON());
		}
		
		yield next;
	},

	findAll: function *(next) {
		var username = this.request.fields.username;
		var queryResponse = Credential.findAll({
			username: username
		}).then(function(result){
			if (result.length === 0) {
				return JSON.stringify({
					'Error': 'None found'
				});	
			}
			return JSON.stringify(result);
		}).catch(function(err){
			return JSON.stringify(err.toJSON);
		});

		try {
			var response = yield queryResponse;
			this.body = response;
		} catch (err) {
			this.body = JSON.stringify(err.toJSON());
		}

		yield next;
	},

	findOne: function *(next) {
		var username = this.request.fields.username;
		var queryResponse = Credential.findOne({
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
			var response = yield queryResponse;
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
		var queryResponse = Credential.findOneAndRemove({
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
			var response = yield queryResponse;
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
		var queryResponse = Credential.deleteMany({
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
			var response = yield queryResponse;
			this.body = response;
		} catch (err) {
			this.body = JSON.stringify(err.toJSON());
		}

		yield next;
	}
}