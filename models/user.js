const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userScheme = mongoose.Schema({
    username: {type: String, unique: true},
    fullname: {type: String, unique: true, default: ''},
    email: {type: String, unique: true},
    password: {type: String, default: ''},
    userImage: {type: String, default: 'default.png'},
    facebook: {type: String, default: ''},
    fbtokens: Array,
    google: {type: String, default: ''},
    googleTokens: Array
});

userScheme.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userScheme.methods.validUserPassword = function(password){
    return bcrypt.compareSync(password, this.password);
    
}

module.exports = mongoose.model('User', userScheme);