const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Associations", () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({ name: "joe" });
    blogPost = new BlogPost({ title: "JS is cool", content: "yes sir" });
    comment = new Comment({ content: "congrats on post" });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });
  it("saves a relation between user and blogpost", (done) => {
    User.findOne({ name: "joe" })
      .populate("blogPosts")
      .then((user) => {
        assert(user.blogPosts[0].title === "JS is cool");
        done();
      });
  });
  it("it saves full relation graph", (done) => {
    User.findOne({ name: "joe" })
      .populate({
        path: "blogPosts",
        populate: {
          path: "comments",
          model: "comment",
          populate: {
            path: "user",
            model: "user",
          },
        },
      })
      .then((user) => {
        assert(user.name === "joe");
        assert(user.blogPosts[0].title === "JS is cool");
        assert(user.blogPosts[0].comments[0].content === "congrats on post");
        assert(user.blogPosts[0].comments[0].user.name === "joe");
        done();
      });
  });
});
