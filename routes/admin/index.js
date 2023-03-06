const express = require("express");
const path = require("path");
const Category = require("../../models/Category");
const router = express.Router();
const Post = require("../../models/Post");
const User = require("../../models/User");

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/categories", (req, res) => {
  Category.find({})
    .sort({
      $natural: -1,
    })
    .lean()
    .then((categories) => {
      res.render("admin/categories", { categories: categories });
    });
});

router.post("/categories/", (req, res) => {
  Category.create(req.body, (error, category) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ error: "Error creating new category" });
    }
    res.redirect("/admin/categories");
  });
});

router.delete("/categories/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id, (error, category) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ error: "Error deleting category" });
    }
    res.redirect("/admin/categories");
  });
});

router.get("/posts", (req, res) => {
  Post.find({})
    .populate({
      path: "category",
      model: Category,
    })
    .sort({
      $natural: -1,
    })
    .lean()
    .then((posts) => {
      res.render("admin/posts", { posts: posts });
    });
});

router.delete("/posts/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (error, post) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ error: "Error deleting post" });
    }
    res.redirect("/admin/posts");
  });
});

router.get("/posts/edit/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .lean()
    .then((post) => {
      Category.find({})
        .lean()
        .then((categories) => {
          res.render("admin/editpost", { post: post, categories: categories });
        });
    });
});

router.put("/posts/:id", (req, res) => {
  const post_image = req.files.post_image;
  post_image.mv(
    path.resolve(__dirname, "../../public/img/postimages", post_image.name)
  );

  Post.findOne({ _id: req.params.id }).then((post) => {
    post.title = req.body.title;
    post.content = req.body.content;
    post.category = req.body.category;
    post.post_image = `/img/postimages/${post_image.name}`;
    post.date = req.body.date;

    post.save().then((updatedPost) => {
      res.redirect("/admin/posts");
    });
  });
});

module.exports = router;
