var mongodb =require('mongodb');

var MongoClient= mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/mydb';
var express = require('express');
var bodyParser =require('body-parser');
var app=express();
var port = 3000;
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');

app.get("/",(req,res) => {
	res.sendFile(__dirname + "/public/index.html");

	// document.getElementById("output").innerHTML= "<b>#</b>+result";

  	MongoClient.connect(url, function(err, db1) {
    if (err) return err;
        var dbo = db1.db("mydb");
  		dbo.collection('Notes').find().toArray((err, result) => {
    if (err) return console.log(err);
    // res.render('index.ejs', {Notes: result});

   		console.log(result);
  })
})
});

app.post('/Notes', (req, res) => {
  MongoClient.connect(url, function(err, db1) {
    if (err) return err;
        var dbo = db1.db("mydb");
        dbo.collection('Notes').save(req.body, (err, result) => {
    if (err) return console.log(err);
        console.log('saved to database');
        return res.redirect('/');



      // if (err) return err;
      //   dbo.collection('Notes').find().toArray((err, result) => {
      // if (err) return console.log(err);
      //   res.render('index.ejs', {Notes: result});
      //   console.log(result);
      // })



  })
  });
})

app.listen(port,() => {
	console.log("Server Listening on port"+port);

});
