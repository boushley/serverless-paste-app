'use strict';

var shortid = require('shortid');

module.exports = function(client) {
  return function(event, cb) {

    var item = {
      id: shortid.generate(),
      content: event.content
    };

    var dynamoRequest = {
      TableName: process.env.TABLE_NAME,
      Item: item
    };

    client.put(dynamoRequest, function(err, data) {
      if (err) {
        cb(err);
      } else {
        cb(null, {success: true, id: item.id});
      }
    });
  };
};
