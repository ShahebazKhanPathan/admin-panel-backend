const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const Joi = require('joi');
const User = require('../models/user');
const passwordComplexity = require('joi-password-complexity');

router.get('/', async (req, res, next) => {
    try {
        const users = await User
            .find()
            .select("_id firstName lastName email")
        res.send(users);
    }
    catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const data = req.body;

    const { error } = validateUser(data);
    if (error) return res.status(400).send(error.message);

    const checkAlreadyExist = await User.find({ email: data.email });
    if (checkAlreadyExist.length > 0) return res.status(409).send('Email already exists.');

    const complexity = passwordComplexity().validate(data.password);
    if (complexity.error) return res.status(400).send(complexity.error.message);
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    try {
        const user = new User({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword
        });

        const newUser = await user.save();
        const token = jwt.sign({ id: newUser._id }, config.get('privateKey'));
        res.status(201).send(token);
    }
    catch (err) {
        next(err);
    }
});

const validateUser = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(4).max(50).required(),
        lastName: Joi.string().min(4).max(50).required(),
        email: Joi.string().min(5).max(100).required(),
        password: Joi.string().min(8).max(100).required()
    });

    return schema.validate(data);
}

module.exports = router;