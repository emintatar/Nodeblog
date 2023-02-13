const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const express = require("express");
const exphbs = require("express-handlebars");
const generateDate = require("./helpers/generateDate").generateDate;
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

// File upload middleware
app.use(fileUpload());

// Static files middleware
app.use(express.static("public"));

// Handlebar files middleware
app.engine(
  "handlebars",
  exphbs.engine({
    helpers: {
      generateDate: generateDate,
    },
  })
);
app.set("view engine", "handlebars");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes middleware
const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
