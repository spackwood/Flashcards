const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require('serve-favicon');
const logger = require('morgan');

const flashcard = require("./routes/api/flashcard");

const app = express();

require('dotenv').config();
require('./config/database');



app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/flashcard/", flashcard);

// DB Configuration
const db = require("./config/keys").mongoURI;

// Mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// configure bth serve-favicon & static middlewares
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev serve3r
const port = process.env.PORT || 3001;

app.listen(port, function() {
    console.log(`express app running on port ${port}`)
});