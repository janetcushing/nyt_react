
//=================================================
// dependencies
//=================================================
import React from "react";
import Express from "express";
import Request from "request";
import mongojs from "mongojs";
// const router = express.Router();
const Articles = require("../models/articles.js");
import articleController from "articleController";

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