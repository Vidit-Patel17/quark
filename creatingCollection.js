var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url,function(err,db1){
if(err) throw err;
var dbo = db1.db("mydb");
dbo.createCollection("Notes",function(err,res){
	if (err) throw err;
	console.log("colleciton Created");
	db1.close();
	});
});

