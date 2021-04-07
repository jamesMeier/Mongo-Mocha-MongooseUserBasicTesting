const log = console.log;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post");
//creating a user blueprint
const userSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be greater than 2",
    },
    required: [true, "Name is required"],
  },
  postCount: Number,
  posts: [PostSchema],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
