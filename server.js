var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = 8080;

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})