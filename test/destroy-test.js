const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
	//declase joe as a new variable
	let joe;
	//
	beforeEach(done => {
		//save joe to the db before tets run
		joe = new User({ name: 'Joe' });
		joe.save().then(() => done());
	});
	it('model instance remove', done => {
		//simple instance remove
		joe
			.remove()
			//checking to see if joe exists in the database
			// another database query that returns another promise
			.then(() => User.findOne({ name: 'Joe' }))
			//this runs with whatever was returned from afore promise
			.then(user => {
				//we did not find a user
				assert(user === null);
				//call done
				done();
			});
	});

	it('class method remove', done => {
		//User model used to delete a bunch od records
		User.deleteMany({ name: 'Joe' })
			// another database query that returns another promise
			.then(() => User.findOne({ name: 'Joe' }))
			//this runs with whatever was returned from afore promise
			.then(user => {
				//we did not find a user
				assert(user === null);
				//return done
				done();
			});
	});
	it('class method findOneAndRemove', done => {
		User.findOneAndDelete({ name: 'Joe' })
			.then(() => User.findOne({ name: 'Joe' }))
			//this runs with whatever was returned from afore promise
			.then(user => {
				//we did not find a user
				assert(user === null);
				//call done
				done();
			});
	});

	it('class method findByIdAndRemove', done => {
		User.findByIdAndDelete(joe._id)
			.then(() => User.findOne({ name: 'Joe' }))
			//this runs with whatever was returned from afore promise
			.then(user => {
				//we did not find a user
				assert(user === null);
				//call done
				done();
			});
	});
});
