const assert = require('assert')
const User = require('../src/user')

describe('Updating a record', () => {
    let joe;
    
    beforeEach((done) => {
        joe = new User({ name:'Joe'});
        joe.save()
        .then(() => done());
    })
    //callback return a promise named as operation which handles the .thens
    function assertName(operation, done) {
        operation
             //look for all users without criteria, this returns an array
            .then(() => User.find({}))
            //users are returned
            .then((users) => {
                assert(users.length ===1);
                assert(users[0].name ==='Alex');
                //done is passed from the it statements into the arguments of assertName
                done();
            })
    };


    it('instance type/ set n save', (done) => {
        // console.log(joe) set only changed in the memory not the database
        joe.set('name', 'Alex');
        //.save returns a promise and that promise is handed off to assertName
        assertName(joe.save(), done);   

    })

    it('model instance can update', (done) => {
        assertName(joe.updateOne({name: 'Alex'}), done);
    })
    it('model class update', (done) => {
        assertName(
            User.updateMany({name: 'Joe'}, {name:'Alex'}),
            done);

    })
    it('model class update one record', (done) => {
        assertName(
            User.findOneAndUpdate({name:'Joe'}, {name: 'Alex'}),
            done)

    })
    it('model class find one record with id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name:'Alex'}),
            done
        )
    })
})