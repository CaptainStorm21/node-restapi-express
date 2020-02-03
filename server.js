var express = require('express');
var app = express();
//see notes.txt for why we need body-parser
var bodyParser = require('body-parser');
//mongo db database
var mongoose = require('mongoose');
//import model of vehicle
var Vehicle = require('./app/models/vehicle');

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

//middleware  used for validations, long thngs
//stop requests fro continuing in the event that is
// when you send a request before it gets to the route
//middleware wll be steppping in and running a process
//or do validations bbefore it moves or
router.use(function(req, res, next) {
    console.log('middleware testing going on');
    //without next(), middleware operation will stp the process
    next();
});

//middleware completes then move to router

//test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to api' });
});

//vehicle
router.route('/vehicles')
/////////// POST /////////////////////
        .post(function(req, res) {
            //new instance of vehicle
            var vehicle = new Vehicle();
            vehicle.make = req.body.make;
            vehicle.model = req.body.model;
            vehicle.color = req.body.color;

            vehicle.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Vehicle was successfully manufactured!' });
            });
        })

/////////// GET /////////////////////
        .get(function(res, req) {
            Vehicle.find(function(err, vehicles) {
                if (err) {
                    res.send(err)
                }
                res.json(vehicles)
            });
        });

/////////// LOCATE A VEHICLE /////////////////////
router.route('/vehicle/:vehicle_id')
    .get(function(req, res){
        Vehicle.findById(req.params.vehicle_id, function(err, vehicle){
            if (err) {
                res.send(err)
            }
            res.json(vehicle);
        });
    });
    router.route('/vehicle/make/:make')
    .get(function(req, res) {
      Vehicle.find({make:req.params.make}, function(err, vehicle) {
        if (err) {
          res.send(err);
        }
        res.json(vehicle);
      });
    });
  
  router.route('/vehicle/color/:color')
    .get(function(req, res) {
      Vehicle.find({color:req.params.color}, function(err, vehicle) {
        if (err) {
          res.send(err);
        }
        res.json(vehicle);
      });
    });
  
//fire up server
//
app.listen(port);

//print in console that server is running
console.log('Your server is running on ' + port);
