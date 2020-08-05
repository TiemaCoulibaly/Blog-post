const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    posts: posts
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
    if (url === post.titleCompose) {
      console.log("match found!!");
    }
  });
});

app.post("/compose", function (req, res) {
  const composeContenu = {
    titleCompose: req.body.postTitle,
    contentCompose: req.body.postContent
  };
  posts.push(composeContenu);
  res.redirect("/");

});

app.listen(3000, function () {
  console.log("Server started!!");
});