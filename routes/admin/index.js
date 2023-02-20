const express = require("express");
const Category = require("../../models/Category");
const router = express.Router();

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

module.exports = router;
