const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    lastName: {
        type: String,
        required: false,
        min: 3,
        max: 100
    },
    email: {
        type: String,
        required: [true, 'Invalid Email'],
        index: {
            unique: true
        },
        match: /^[a-z][a-z0-9]*[.+-]?[a-z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]{2,3}([.]{1}[a-z]{2,3})?$/
    },
    password: {
        type: String
    },
    userType: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    accessToken: [
        {
            type: String,
        }
    ]
    ,
    isActive: {
        type: Boolean,
        default: true
    },
    hash: String,
    salt: String,
},
    {
        timestamps: true
    }
)

userSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return { salt: this.salt, hash: this.hash }
}

//function to validate password
userSchema.methods.validPassword = (password, user) => {
    if (user.salt) {
        var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
        return user.hash === hash
    }
    return -1
}

module.exports = mongoose.model('User', userSchema);
userSchema.plugin(uniqueValidator)
