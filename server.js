var express = require ('express');
var app = express();
//see notes.txt for why we need body-parser
var bodyParser = require ('body-parser');
//mongo db database
var mongoose = require ('mongoose');

//configure bodyParser()
//allows us to grab data from the body of position
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setup a server this.props.
var port = process.env.PORT || 3000;

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/node-express-api');

//API routes 
var router = express.Router();

//routes will all be prefixed with /api 
app.use('/api', router);

//test route 
router.get('/', function(req, res){
    res.json({ message: 'welcome to api'})
})


//fire up server 
//
app.listen(port);

//print in console that server is running
console.log('Your server is running on ' + port);