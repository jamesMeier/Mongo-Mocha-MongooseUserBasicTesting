const log = console.log;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    postCount:Number
});

const User = mongoose.model('user', userSchema);


module.exports = User;
