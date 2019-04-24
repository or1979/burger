const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const timeout = require("connect-timeout");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

var port = process.env.PORT || 3000;

//Express static uses whatever domain name/public
// app.use(express.static(__dirname + '/public'));
app.use("/static", express.static("public")); //Handlebars likes this one better
// Timeout
app.use(timeout(15000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}

//Sets up morgan for logging
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

// setup the logger (writes to the file)
app.use(morgan("combined", { stream: accessLogStream }));

//This sets up body-parser
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(haltOnTimedout);

//This is setting up method-override 
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
app.use(haltOnTimedout);

//sets up express-handlebars

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Setting up the routes
const routes = require("./controllers/burgers_controller");


app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);
app.use(haltOnTimedout);


app.listen(port, ()=>{
  console.log("server on");
})