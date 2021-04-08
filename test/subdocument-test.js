const assert = require("assert");
const log = console.log;
const User = require("../src/user");

describe("Subdocuments", () => {
  it("Can create a subdocument", (done) => {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle" }] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "PostTitle");
        done();
      });
  });
  it("can add subdocs to existing records", (done) => {
    const joe = new User({ name: "joe", posts: [] });
    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        user.posts.push({ title: "new post" });
        return user.save();
      })
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(user.posts[0].title === "new post");
        done();
      });
  });
  it("It can remove existing sub doc", (done) => {
    const joe = new User({ name: "joe", posts: [{ title: "New Title" }] });
    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
