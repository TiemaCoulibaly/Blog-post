const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");


const app = express();

app.use(express.static("public"));
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.set("view engine", "ejs");

let posts = [];

mongoose.connect(
	"mongodb://localhost:27017/BlogDB", {
		useNewUrlParser: true,
	}
);



const postSchema = {
	title: String,
	content: String,
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function (req, res) {
	res.render("home", {
		posts: posts,
	});
});
app.get("/about", function (req, res) {
	res.render("about");
});
app.get("/contact", function (req, res) {
	res.render("contact");
});

app.get("/compose", function (req, res) {
	res.render("compose");
});

app.get("/posts/:post", function (req, res) {
	const url = req.params.post;

	posts.forEach(function (post) {
		const titre = post.titleCompose;
		if (_.lowerCase(url) === _.lowerCase(titre)) {
			res.render("post", {
				titlePost: post.titleCompose,
				contentPost: post.contentCompose,
			});
		}
	});
});

app.post("/compose", function (req, res) {
	const post = new Post({

		title: req.body.postTitle,

		content: req.body.postBody


	});
	post.save();
	res.redirect("/");
});




app.listen(3000, function () {
	console.log("Server started!!");
});