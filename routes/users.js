const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/register", (req, res) => {
  res.render("site/register");
});

router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/login", (req, res) => {
  res.render("site/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err) throw err;

    if (user) {
      if (user.password == password) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        res.redirect("/users/login");
      }
    } else {
      res.redirect("/users/register");
    }
  });
});

module.exports = router;
