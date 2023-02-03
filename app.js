const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const hostname = "127.0.0.1";

// This middleware is required to display static files
app.use(express.static("public"));

// This middleware is required to display handlebars files
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("site/index");
});

app.get("/about", (req, res) => {
  res.render("site/about");
});

app.get("/blog", (req, res) => {
  res.render("site/blog");
});

app.get("/contact", (req, res) => {
  res.render("site/contact");
});

app.get("/login", (req, res) => {
  res.render("site/login");
});

app.get("/register", (req, res) => {
  res.render("site/register");
});

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
