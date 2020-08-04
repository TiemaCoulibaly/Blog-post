const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.get("/", function (req, res) {
	console.log("hello world");
});

app.listen(3000, function () {
	console.log("Server started!!");
});
