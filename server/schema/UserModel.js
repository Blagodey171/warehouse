const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAuthorisation: {type: Boolean}
})

module.exports = model('User', UserSchema);