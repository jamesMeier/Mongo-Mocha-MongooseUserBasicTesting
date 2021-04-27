const assert = require("assert");
const User = require("../src/user");
const mongoose = require("mongoose");
const BlogPost = require("../src/blogPost");

describe("middleware", () => {
  let joe, blogPost;
  beforeEach((done) => {
    joe = new User({ name: "joe" });
    blogPost = new BlogPost({ title: "JS is cool", content: "yes sir" });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });
  it(" users clean up dangling blogposts on remove", (done) => {
    joe
      .remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
