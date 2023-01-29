const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const path = require("path");

router.get("/new", (req, res) => {
  res.render("site/addpost");
});

/*

router.post("/test", (req, res) => {
  // Create a new post and save it to the database
  Post.create(req.body, (err, post) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log("Post created: " + post);

      // Upload the image to the server
      let post_image = req.files.post_image;
      post_image.mv(
        path.resolve(__dirname, "../public/img/postimages", post_image.name),
        (err) => {
          if (err) {
            console.log("Error: " + err);
          } else {
            console.log("Image uploaded");
          }
        }
      );
    }
  });

  res.redirect("/");
});

*/

router.post("/test", (req, res) => {
  let post_image = req.files.post_image;
  post_image.mv(path.resolve(__dirname, "../public/img/postimages", post_image.name));
  Post.create({...req.body, post_image: `/public/img/postimages/${post_image.name}`});
  res.redirect("/");
});

// Each post on the blog page should link to a unique page for that post
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .lean()
    .exec((err, post) => {
      if (err) {
        console.log("Error: " + err);
      } else {
        res.render("site/post", { post: post });
      }
    });
});

module.exports = router;
