const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", (req, res) => {
  res.render("site/index");
});

router.get("/about", (req, res) => {
  res.render("site/about");
});

// Show all posts on the blog page 
router.get("/blog", (req, res) => {
  Post.find({})
    .lean()
    .exec((err, posts) => {
      if (err) {
        console.log("Error: " + err);
      } else {
        res.render("site/blog", { posts: posts });
      }
    });
});

router.get("/contact", (req, res) => {
  res.render("site/contact");
});

router.get("/login", (req, res) => {
  res.render("site/login");
});

router.get("/register", (req, res) => {
  res.render("site/register");
});

module.exports = router;
