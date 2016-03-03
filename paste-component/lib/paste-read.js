'use strict';

module.exports = function(client) {
  return function(event, cb) {

    var dynamoRequest = {
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: 'id = :pasteId',
      ExpressionAttributeValues: {
        ':pasteId': event.params.id
      }
    };

    client.query(dynamoRequest, function(err, data) {
      if (err) {
        cb(err);
      } else {
        if (data.Items.length < 1) {
          cb(null, {success: false, errorMessage: 'No paste found'});
        } else {
          cb(null, {success: true, paste: data.Items[0].content});
        }
      }
    });
  };
};
