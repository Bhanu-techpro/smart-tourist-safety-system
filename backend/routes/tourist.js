const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Tourist = require('../models/Tourist');
const { registerTouristOnBlockchain } = require('../utils/blockchain');

// @route   POST /api/tourist/register
// @desc    Register a new tourist
// @access  Admin
router.post(
    '/register',
    [
        auth,
        admin,
        [
            body('name', 'Name is required').not().isEmpty(),
            body('email', 'Please include a valid email').isEmail(),
            body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
            body('dateOfBirth', 'Date of birth is required').isISO8601().toDate(),
            body('nationality', 'Nationality is required').not().isEmpty(),
            body('passportNumber', 'Passport number is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, dateOfBirth, nationality, passportNumber, itinerary, emergencyContacts } = req.body;

        try {
            let tourist = await Tourist.findOne({ email });
            if (tourist) {
                return res.status(400).json({ msg: 'Tourist with this email already exists' });
            }

            // In a real app, you'd create a new wallet for the tourist
            const touristWalletAddress = "0x...some_newly_generated_address...";

            // Register on blockchain
            const { dataHash, expiryTimestamp } = await registerTouristOnBlockchain(
                touristWalletAddress,
                { passportNumber, name, dateOfBirth },
                itinerary.endDate
            );

            tourist = new Tourist({
                name,
                email,
                password,
                dateOfBirth,
                nationality,
                passportNumber, // This should be encrypted
                itinerary,
                emergencyContacts,
                digitalId: {
                    address: touristWalletAddress,
                    dataHash,
                    expiryTimestamp: new Date(expiryTimestamp * 1000),
                },
                status: 'active',
            });

            await tourist.save();

            res.status(201).json({ message: 'Tourist registered successfully', tourist });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   GET /api/tourist/:id
// @desc    Get tourist details
// @access  Private (Admin or the tourist themselves)
router.get('/:id', auth, async (req, res) => {
    try {
        const tourist = await Tourist.findById(req.params.id).select('-password -locationHistory');
        if (!tourist) {
            return res.status(404).json({ msg: 'Tourist not found' });
        }

        // Authorization check
        if (req.user.role !== 'admin' && tourist.id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        res.json(tourist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/tourist/location
// @desc    Update tourist's location
// @access  Private (Tourist only)
router.post('/location', auth, async (req, res) => {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
        return res.status(400).json({ msg: 'Latitude and longitude are required.' });
    }

    try {
        const tourist = await Tourist.findById(req.user.id);
        if (!tourist) {
            return res.status(404).json({ msg: 'Tourist not found' });
        }

        const newLocation = { latitude, longitude, timestamp: new Date() };
        tourist.lastLocation = newLocation;
        
        // Optional: Add to location history (can get large)
        // tourist.locationHistory.push(newLocation);

        await tourist.save();

        // Emit location update to dashboard
        if (global.io) {
            global.io.to('dashboard-room').emit('tourist-location-update', {
                touristId: tourist.id,
                location: tourist.lastLocation,
            });
        }

        res.json({ msg: 'Location updated' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
