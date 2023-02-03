const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/new", (req, res) => {
  res.render("site/addpost");
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .lean()
    .then((post) => {
      res.render("site/post", { post: post });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/test", (req, res) => {
  Post.create(req.body, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
