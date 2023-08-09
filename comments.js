//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

//Load data from file
var data = fs.readFileSync('comments.json');
var comments = JSON.parse(data);

//Set up server
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up server port
var port = process.env.PORT || 3000;

//Set up server to listen at port
app.listen(port, function(){
	console.log('Server is running at port ' + port);
});

//Set up server to get comments
app.get('/comments', function(req, res){
	res.json(comments);
});

//Set up server to post comments
app.post('/comments', function(req, res){
	var comment = req.body;
	comments.push(comment);
	res.json(comment);
});

//Set up server to delete comments
app.delete('/comments/:id', function(req, res){
	var id = req.params.id;
	var comment = comments[id];
	comments.splice(id, 1);
	res.json(comment);
});

//Set up server to update comments
app.put('/comments/:id', function(req, res){
	var id = req.params.id;
	var comment = comments[id];
	comment.name = req.body.name;
	comment.comment = req.body.comment;
	res.json(comment);
});
