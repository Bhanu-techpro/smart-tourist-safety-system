const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Geofence = require('../models/Geofence');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/geofence
// @desc    Get all geofence zones
// @access  Public
router.get('/', async (req, res) => {
    try {
        const zones = await Geofence.find();
        res.json(zones);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/geofence
// @desc    Create a new geofence zone
// @access  Admin
router.post('/', [auth, admin, [
    body('name', 'Name is required').not().isEmpty(),
    body('riskLevel', 'Risk level must be a number between 1 and 5').isFloat({ min: 1, max: 5 }),
    body('location', 'Location must be a valid GeoJSON Polygon').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, riskLevel, location } = req.body;

    try {
        const newGeofence = new Geofence({
            name,
            riskLevel,
            location
        });

        const geofence = await newGeofence.save();
        res.json(geofence);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
