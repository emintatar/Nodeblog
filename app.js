const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
const port = 3000;
const hostname = "127.0.0.1";

// Connect to the database and handle any errors that may occur during the connection process 
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb://127.0.0.1/nodeblogdb",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("DB connection succeeded");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

// Set up the file upload middleware
app.use(fileUpload());

// Set up the view engine and the static files directory
app.use(express.static("public")); 
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Set up the body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up the routes for the application 
const main = require("./routes/main");
const posts = require("./routes/posts");

// Use the routes for the application 
app.use("/", main);
app.use("/posts", posts); 

// Start the server and listen for requests 
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
