
//=================================================
// dependencies
//=================================================
// import React from "react";
const Express = require("express");
// const db = require("../models");
const  Request = require("request");
const  mongojs = require("mongojs");
// const Articles = require("../models/articles");
const router = Express.Router();
const Articles = require("../models/articles.js");
const articleController  = require("./articleController");

//=================================================
// global variables
//=================================================

//=================================================
// Functions
//=================================================

//-----------------------------------------------------
// retrieve the previously saved articles from the
// Article collection to populate the saved article panel
//----------------------------------------------------

function getSavedArticles2(req, res) {
  console.log("IM IN getSavedArticles2");
  Articles.find()
    .then(function (savedArticles) {
      console.log(savedArticles);
      res.send(savedArticles)
    }).catch(function (err) {
      console.log(`DB Error from getSavedArticles2: ${err}`);
    });
}

//-----------------------------------------------------
// remove a saved article document from the collection
//-----------------------------------------------------
function removeSavedArticle(req, res) {
  console.log(`im in removeSavedArticle ${req.params.id}`);
  Articles.findById(req.params.id)
  .remove()
  .then(function (data) {
    console.log(data);
    res.send("success");
  }).catch(function (err) {
    console.log(`There was a DB error - removeSavedArticle: ${err}`);
    res.status(500).send("A Server Error Occurred");
  });
}

//-----------------------------------------------------
// insert a new article into the
// collection
//-----------------------------------------------------
function insertNewArticle(req, res) {
  console.log("IM IN insertNewArticle");
  console.log(req.body);
  let currentArticle = {
    title: req.body.title,
    web_url: req.body.web_url,
    snippet: req.body.snippet,
    date_published: req.body.pub_date
  };
  Articles.create(currentArticle, function (err, data) {
    if (err) {
      console.log(`There was a DB error from insertNewArticle: ${err} `);
      res.status(500).end();
    } else {
      res.send("success");
    }
  });
}

//==============
// ROUTES
//==============


//----------------------------------------------
// get saved articles from the database
//----------------------------------------------
router.get("/api/articles", function (req, res) {
  console.log("im on the server side about to get the saved articles");
  // findAll(req, res);
  getSavedArticles2(req, res);
});

//----------------------------------------------
// add an article to  the database
//----------------------------------------------
router.post("/api/article", function (req, res) {
  // create(req, res);
  insertNewArticle(req, res);
});

//----------------------------------------------
// add an article to  the database
//----------------------------------------------
router.delete("/api/article/:id", function (req, res) {
  // remove(req, res);
  removeSavedArticle(req, res);
});


//--------------------------------------
// Export routes for server.js to use.
//--------------------------------------
module.exports = router;