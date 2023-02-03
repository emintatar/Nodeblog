const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("site/index");
});

router.get("/about", (req, res) => {
  res.render("site/about");
});

router.get("/blog", (req, res) => {
  res.render("site/blog");
});

router.get("/posts/new", (req, res) => {
    res.render("site/addpost");
});

router.post("/posts/test", (req, res) => {
    console.log("Post request received");
    res.redirect("/");
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
