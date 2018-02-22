
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

//==============
// ROUTES
//==============


//----------------------------------------------
// get saved articles from the database
//----------------------------------------------
router.get("/api/articles", function (req, res) {
  console.log("im on the server side about to get the saved articles");
  findAll(req, res);
});

//----------------------------------------------
// add an article to  the database
//----------------------------------------------
router.post("/api/articles", function (req, res) {
  create(req, res);
});

//----------------------------------------------
// add an article to  the database
//----------------------------------------------
router.delete("/api/articles/:id", function (req, res) {
  remove(req, res);
});


//--------------------------------------
// Export routes for server.js to use.
//--------------------------------------
module.exports = router;