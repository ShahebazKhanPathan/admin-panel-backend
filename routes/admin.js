const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');

router.post("/", (req, res, next) => {
    const { id, password } = req.body;
    
    if (id == config.get('adminConfig.id') && password == config.get('adminConfig.password')) {
        const token = jwt.sign({ id: id, isAdmin: true}, config.get('privateKey'));
        return res.status(201).send(token);
    }
    return res.status(404).send('Invalid credentials.');
});

module.exports = router;