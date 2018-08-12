# aws-s3-encryption-client

This repo hosts the 2015 solution of the AWS S3 Encryption Client, originally featured as a pull request for the AWS SDK, which in turn was a direct follow-up to the issue [#800](https://github.com/aws/aws-sdk-js/issues/800).

The Ruby lib was as a basis to reconstruct the logic for the JavaScript lib. Certain liberties were taken, some related with the JavaScript syntax and some with the existing conventions of the AWS SDK; the linting script was responsible for a few tweaks as well.

Please note, the new code relates with the ability to automatically encrypt/decrypt S3 objects from the client-side. It is not currently addressing SSE (Server-side Encryption), which I'm not sure if it's under the `AWS.S3` domain. 


## Install

Using NPM:

```
npm install aws-s3-encryption-client
```

Direct download:  [https://github.com/makesites/backbone-app/archive/master.zip](https://github.com/makesites/backbone-app/archive/master.zip)

Find the compilled library in the "build/" folder. Choose between the uncompressed and comment annotated **backbone.app.js** and the minified **backbone.app-min.js**



## Examples

At the current state my main objective, to read KMS encrypted SES messages is fulfilled. This can be easily done like this:

```
var params = {
  Bucket: '{{BUCKET_NAME}}',
  Key: '{{BUCKET_ADDRESS}}',
};

var store = new AWS.S3.Encryption.Client({
  accessKeyId: '...',
  secretAccessKey: '...',
  region: '...', 
  sslEnabled: true,
  signatureVersion: 'v4',
});

var downloader = store.getObject(params, function(err, response ){
  // output...
  res.end( response.Body );
});
```

## Features

Additional abilities are in place, but not fully tested:

### putObject
- Encrypt and upload content using a `KMSKeyId` and `EncryptionKey`.
- Encrypt and upload content using only a `KMSKeyId`, with the ``EncryptionKey` automatically generated.
- Encrypt content using a custom `kms_client`, passed with the options of  `AWS.S3.Encryption.Client`.

### getObject
- Decrypt and download content using a `KMSKeyId` and `EncryptionKey`.
- Decrypt and download content using only a `KMSKeyId`, with the ``EncryptionKey` resourced from the file headers (as _'x-amz-key-v2'_).
- Decrypt content using a custom `kms_client`, passed with the options of  `AWS.S3.Encryption.Client`.

There is also scaffolding for allowing an instruction file, which will contain the encryption context of an encrypted file, but that functionality is at present disabled. 

Some of these features weren't completed to prevent from introducing new conventions. For example, arbitrary including the `x-amz-key-v2` key in the putObject response (to allow the user to save that info).


## Credits

Initiated by Makis Tracend ( [@tracend](http://github.com/tracend) )

Distributed through [Makesites.org](http://makesites.org/)


## License

Released under the [Apache License v2.0](http://www.makesites.org/licenses/APACHE-2.0)
