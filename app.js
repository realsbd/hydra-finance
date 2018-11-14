var express = require('express');
var ejs = require('ejs');
var hydraController = require('./controllers/hydraController');
// var session = require('express-session');
// var MongoDBStore = require('connect-mongodb-session')(session);

var app = express();

app.set('view engine', 'ejs');

//static files
app.use('/assets', express.static('assets'));
// app.use(session({
//     secret: 'kimoni',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 }
//     }));
// // Session
// var applySession = new MongoDBStore({
//     uri: 'mongodb://hydrakimoni:kimoni1@ds235411.mlab.com:35411/connect_mongodb_session_test',
//     collection: 'mySessions'
//     });
     
//     applySession.on('connected', function() {
//     applySession.client; // The underlying MongoClient object from the MongoDB driver
//     });
     
//     // Catch errors
//     applySession.on('error', function(error) {
//     assert.ifError(error);
//     assert.ok(false);
//     });


//fire controller
hydraController(app);
// readController();


//port listening
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function (){
    console.log('listening on port ' + app.get('port'));
});
