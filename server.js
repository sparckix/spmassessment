//server.js
var PythonShell = require('python-shell');
var express     = require('express');  
var app         = express();  
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var options = {
  mode: 'text',
};

 app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users

    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(process.env.PORT || 8080)
    console.log("Listening patiently...")


// routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all todos
    app.post('/api/assessment', function(req, res) {
        console.log(req.body.focus_area + " and " + req.body.score);
        PythonShell.run('percentile_calculator.py', {mode: 'text', args: [req.body.focus_area, req.body.score]}, function (err, results) {
            if (err) throw err;
            if (typeof results === 'undefined') { console.log("error"); return;}
                
          res.json({results: results[0]});
        });
    });

