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

/*
---CREATE A NEW POST---

Post.create({
  title: "My third post",
  content: "This is my third post",
})
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.log(err);
  });
*/

/*
---FIND SPECIFIC POST---

Post.find({
  title: "My first post",
})
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.log(err);
  });
*/

/*
---FIND ALL POSTS---

Post.find({ })
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.log(err);
  });
*/

/* 
---FIND POST BY ID---

Post.findById("63dcf649ce4540af0180334d")
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.log(err);
  });
 */

/* 
---UPDATE POST BY ID---

Post.findByIdAndUpdate("63dcf649ce4540af0180334d", {
  title: "My first post UPDATED",
  content: "This is my first post UPDATED",
})
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.log(err);
  });
 */

/*
---DELETE POST BY ID---

Post.findByIdAndDelete("63dcf649ce4540af0180334d")
  .then((post) => {
    console.log(post);
  })
  .catch((err) => {
    console.log(err);
  }); 
  */
