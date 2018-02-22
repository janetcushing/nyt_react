
// Require mongoose
const mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model
const ArticlesSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "title is Required",
    validate: [
      function(input) {
        return input.length >= 1;
      },
      "String should be longer."
    ]
  },
  web_url: {
    type: String,
    trim: true,
    required: "web_url is Required"
  }, 
  snippet: {
    type: String,
    trim: true
  },
  date_published: {
    type: String,
    trim: true,
    required: "date published is Required"
  }
});

const Articles = mongoose.model("NYTArticles", ArticlesSchema);

module.exports = Articles;
