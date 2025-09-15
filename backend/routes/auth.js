const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Tourist = require('../models/Tourist');
// Assuming a User model for dashboard staff
// const User = require('../models/User'); 

router.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // In a real app, you'd check multiple collections (Tourists, Users)
            let user = await Tourist.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                    role: user.role,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        user: { id: user.id, name: user.name, role: user.role },
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
