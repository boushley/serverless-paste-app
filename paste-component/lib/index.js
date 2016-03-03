/**
 * Lib
 */

var aws = require('aws-sdk');
aws.config.update({
  region: 'us-west-2'
});
var client = new aws.DynamoDB.DocumentClient();

module.exports.create = require('./paste-create')(client);
module.exports.read = require('./paste-read')(client);
module.exports.update = require('./paste-update')(client);
