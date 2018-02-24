const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
// mongoose dependency used for accessing mongodb collection
var mongoose = require("mongoose");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

//------------------------------------------
// connect to the controller for app routes
//------------------------------------------
var routes = require("./controller/controller.js");
// app.use("/", routes);
app.use(routes);



// Requiring the `Article` model for accessing the collection
var Articles = require("./models/articles.js");

//-----------------------------
// mongoose connection
//-----------------------------
mongoose.Promise = Promise;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/nytreact", {});
}

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
