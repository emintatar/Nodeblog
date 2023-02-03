const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const hostname = "127.0.0.1";

// Connect to database
mongoose.set("strictQuery", true);
mongoose
  .connect(`mongodb://${hostname}/testdb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Static files middleware
app.use(express.static("public"));

// Handlebar files middleware
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes middleware
const main = require("./routes/main");
const posts = require("./routes/posts");
app.use("/", main);
app.use("/posts", posts);

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
