const assert = require("assert");
const User = require("../src/user");
//describe is a function that holds a collection of tests that holds two parameters
// 1. meanigful name to to functionality under test
//2. function that contains actual tests
//(can be nested)
describe("Updating a record", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe", postCount: 0 });
    joe.save().then(() => done());
  });
  //callback return a promise named as operation which handles the .thens
  function assertName(operation, done) {
    operation
      //look for all users without criteria, this returns an array
      .then(() => User.find({}))
      //users are returned
      .then((users) => {
        //assert helps to determine status of test
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        //done is passed from the it statements into the arguments of assertName
        done();
      });
  }

  // it a function that is a test itself and takes two params
  //1 name to test
  // 2 function that holds bosy of test
  it("instance type/ set n save", (done) => {
    // console.log(joe) set only changed in the memory not the database
    joe.set("name", "Alex");
    //.save returns a promise and that promise is handed off to assertName
    assertName(joe.save(), done);
  });

  it("model instance can update", (done) => {
    assertName(joe.updateOne({ name: "Alex" }), done);
  });
  it("model class update", (done) => {
    assertName(User.updateMany({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("model class update one record", (done) => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("model class find one record with id and update", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });

  it("A user can have postCount incremented by 1", (done) => {
    User.update({ name: "Joe" }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
