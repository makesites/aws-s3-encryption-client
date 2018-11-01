var Encryption = require("./s3/encryption");

var Main = function( options ){

	// Pre-init actions
	return new Encryption.Client( options );

}


module.exports = Main;
