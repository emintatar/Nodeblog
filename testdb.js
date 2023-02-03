const mongoose = require("mongoose");
const Post = require("./models/Post");

// Connect to database
mongoose.set("strictQuery", true);
mongoose
  .connect(`mongodb://127.0.0.1/testdb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// Create a new post
Post.create({
  title: "My first post",
  content: "This is my first post",
})
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.log(err);
  });
