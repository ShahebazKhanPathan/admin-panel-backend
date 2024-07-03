const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4
    },
    lastName: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
