const assert = require("assert");
const log = console.log;
const User = require("../src/user");

describe("Reading users out of database", () => {
  let joe;
  //beforeEach is a hook used to save a new user named joe to the db before each test
  //expecting done callback to be returned
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });
  it("Finds all users with Joe", (done) => {
    User.find({ name: "Joe" }).then((users) => {
      //assert that id is true when converted to a string
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
    it("find a user with specific id", (done) => {
      User.findOne({ _id: joe._id }).then((user) => {
        assert(user.name === "Joe");
      });
    });
  });
});
