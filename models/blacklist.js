const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

const Blacklist = mongoose.model('Blacklist', schema);

module.exports = Blacklist;