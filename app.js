const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const express = require("express");
const exphbs = require("express-handlebars");
const generateDate = require("./helpers/generateDate").generateDate;
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");
const methodOverride = require("method-override");
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

// Express session middleware
app.use(
  expressSession({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: `mongodb://${hostname}/testdb` }),
  })
);

// Flash Messages middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

// File upload middleware
app.use(fileUpload());

// Static files middleware
app.use(express.static("public"));

// Method override middleware
app.use(methodOverride("_method"));

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

// Display Links middleware
app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals = {
      displayLinks: true,
    };
  } else {
    res.locals = {
      displayLinks: false,
    };
  }
  next();
});

// Routes middleware
const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
const admin = require("./routes/admin/index");
app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);
app.use("/admin", admin);

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
