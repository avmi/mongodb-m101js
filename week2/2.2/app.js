var client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/weather', function(err, db) {
	var cursor = db.collection('data').find().sort( {"State":1, "Temperature" :-1} );

	var state = '';
	var operator = {'$set':{'month_high':true}};

	cursor.each(function(err, doc) {
		if (doc == null) {
			return db.close();
		} else if (doc.State !== state) {
			state = doc.State;
			db.collection('data').update({'_id':doc._id}, operator, function(err, updated) {
				return console.log('updated');
			});
		}
	});
});