var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://user:userpass@ds115071.mlab.com:15071/carouselpoc1';

var database = null;

var slides = null;

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  database = db;
  // getSlides(db, function() {
  // 	console.log('callback called');
  // });
});


var getSlides = function(callback) {
   var cursor = database.collection('items').find();
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         //console.log(doc);
         slides = doc.items;
         console.log(slides);
         console.log('passing doc.items');
         callback(doc.items);
      } else {
         //callback();
      }
   });
};  

module.exports = { getSlides: getSlides }
