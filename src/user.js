const log = console.log;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("./post");
//creating a user blueprint
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be greater than 2",
    },
    required: [true, "Name is required"],
  },

  posts: [PostSchema],
  likes: Number,
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "blogPost" }],
});

UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
