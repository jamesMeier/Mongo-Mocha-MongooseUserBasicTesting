const mongoose = require("mongoose");
const log = console.log;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/users_test", { useNewUrlParser: true });
before((done) => {
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.warn("Warning ", error);
    });
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    //ready to run next test
    done();
  });
});
