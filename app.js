//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Hey!!! you know what ?? I have been missing you 😭...So tell me ,Are you Happy or sad ?? Okay , leave it!! See, you know right!?! that I'm and always will be with you?? No matter what,No matter how bad the situations turn out to be, always remember I'm with you.Okay now tell me about your day? How was it?? What's the reason behind your smile😊..or who hurt you??🙄..listen!! Tell me everything..let's talk!!!🤗";
const contactContent = "I hope you are enjoying writing and feeling better to have your best friend always available to listen!🙂..I hope everythng is fine and good but in case you stuck somewhere or for any queries,contact at: yourdiary@gmail.com";
const aboutContent = "We all are living in the world where it seems almost impossible to find a right person to share our emotions and feelings.It really is very hard to find a LISTENER..So here comes your BEST FRIEND , YOUR SECRET KEEPER , YOUR PERSONAL DIARY.♥                                                                    To get started with your first post write : /compose after the opened url!♥  ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/tryDB",  {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
