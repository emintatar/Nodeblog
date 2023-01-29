const mongoose = require("mongoose");

// Create a schema for the posts
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },

    content: {
        type: String,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    },

    post_image: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model("Post", PostSchema);