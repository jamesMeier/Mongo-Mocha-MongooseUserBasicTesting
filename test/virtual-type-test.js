const assert = require("assert");
const User = require("./../src/user");

describe("Virtual Types", () => {
  it("postCounts returns number of posts", (done) => {
    const joe = new User({ name: "joe", posts: [{ title: "Post Title" }] });

    joe
      .save()
      .then(() => User.findOne({ name: "joe" }))
      .then((user) => {
        assert(joe.postCount === 1);
        done();
      });
  });
});
