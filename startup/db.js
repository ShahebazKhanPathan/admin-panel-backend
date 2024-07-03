const mongoose = require("mongoose");
const config = require("config");

module.exports = () => {
    try {
        mongoose.connect(config.get("dbConfig.host"))
        .then((res) => console.log("Connected to MongoDB."))
        .catch((err) => console.log(err));
    }
    catch (err) {
        console.log(err);
    }
}

