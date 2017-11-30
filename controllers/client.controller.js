var paths = require('app/appGlobals').paths
  , path = require('path')
	,	Client = require(path.join(paths.modelsDir, 'client.model'));

module.exports = {
	create: function *(next) {
		yield next;
	}
}