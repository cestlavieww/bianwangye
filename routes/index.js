
/*
 * GET home page.
 */

app = require('../app');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/bwydb');

app.get('/', function(req, res){
  res.render('index', {title: "Express"});
});

app.get('/userlist', function(req, res) {
	var collection = db.get('usercollection');
	collection.find({},{},function(e, docs){
		res.render('index', {
			title: "MongoDB",
			"userlist" : docs
		});
	});
});

app.get('/newuser', function(req, res){
  res.render('index', { title: 'Add New User', partials: {newuser: 'newuser'}});
});

app.post('/adduser', function(req, res) {

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /newuser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

require('./user');

