const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const config = require('config');
const Blacklist = require('../models/blacklist');

router.get('/', async (req, res, next) => {
    const token = req.header("auth-token") ? req.header("auth-token") : req.header("admin-auth-token");

    try {
        const isBlacklisted = await Blacklist.findOne({ token: token });
        if (isBlacklisted) return res.status(409).send('Token has expired.');
        res.status(201).send(token);
    }
    catch (err) {
        next(err);
    }
});

router.delete('/', auth, async (req, res, next) => {
    const token = req.header("auth-token") ? req.header("auth-token") : req.header("admin-auth-token");
    const blacklistToken = new Blacklist({ token: token})
    try {
        const result = await blacklistToken.save();
        res.status(201).send(result);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;