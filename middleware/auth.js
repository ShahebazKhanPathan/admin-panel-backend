const jwt = require('jsonwebtoken');
const config = require('config');
const Blacklist = require('../models/blacklist');

module.exports = async (req, res, next) => {

    const token = req.header("auth-token") ? req.header("auth-token") : req.header("admin-auth-token");
    if (!token) return res.status(401).send('Unauthorized access.'); 

    try {
        const isBlacklisted = await Blacklist.findOne({ token: token });
        if (isBlacklisted) return res.status(409).send('Token expired.');
        next();
    }
    catch (err) {
         next(err);
    }
}