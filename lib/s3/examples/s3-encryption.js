var AWS = require('../index');

//console.log(new AWS.S3.Encryption.Client());

 console.log(new AWS.S3.Encryption.DefaultKeyProvider() );
