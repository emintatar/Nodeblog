const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const hostname = "127.0.0.1";

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1/nodeblog-project-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.static("public"));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const main = require("./routes/main");
const posts = require("./routes/posts");

app.use("/", main);
app.use("/posts", posts); 

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});