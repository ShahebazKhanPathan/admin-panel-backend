const express = require("express");
const app = express();
const cors = require("cors");
const auth = require('../routes/auth');
const user = require("../routes/user");
const admin = require("../routes/admin");
const blacklist = require('../routes/blacklist');

module.exports = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use('/api/auth', auth);
    app.use("/api/user", user);
    app.use('/api/admin', admin);
    app.use('/api/blacklist', blacklist);
}