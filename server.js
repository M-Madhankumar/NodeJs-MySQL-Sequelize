var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port =  8080;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

process.env.SECRET_KEY = 'Movie_Rating';

var Routes = require('./router/routes');

app.use("/api",Routes)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})