const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";


app.use(express.static("public"));
app.use(
	bodyParser.urlencoded({
		extended: true
	}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/BlogDB", {
	useNewUrlParser: true
});

const postSchema = {
	title: String,
	content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {

	Post.find({}, function (err, posts) {
		res.render("home", {
			startingContent: homeStartingContent,
			posts: posts
		});
	});
});


app.get("/compose", function (req, res) {
	res.render("compose");
});


app.post("/compose", function (req, res) {

	const post = new Post({
		title: req.body.postTitle,

		content: req.body.postCon
	});

	post.save(function (err) {
		if (!err) {
			res.redirect("/");
		}
	});

});

app.get("/posts/:postId", function (req, res) {
	const postIdRequested = req.params.postId;

	Post.findOne({
		_id: postIdRequested
	}, function (err, post) {

		res.render("post", {
			title: post.title,
			content: post.content

		});
	});

});


app.get("/about", function (req, res) {
	res.render("about");
});
app.get("/contact", function (req, res) {
	res.render("contact");
});

app.listen(3000, function () {
	console.log("Server started!!");
});