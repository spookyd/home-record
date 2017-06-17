/**
 * Created by lukedavis on 12/31/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    name: {
        first: String,
        last: String,
    },
    role: {
        type: String,
        enum: ['Member', 'Admin'],
        default: 'Member'
    },
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date},
    created_at: Date,
    updated_at: Date,
});

UserSchema.pre('save', function (next) {
    var user = this;
    console.log('Preparing to save user: ' + this.username);
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;

                // get the current date
                var currentDate = new Date();

                // change the updated_at field to current date
                user.updated_at = currentDate;

                // if created_at doesn't exist, add to that field
                if (!user.created_at)
                    user.created_at = currentDate;

                next();
            });
        });
    } else {
        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updated_at = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;

        next();
    }
});

UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);