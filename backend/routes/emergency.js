const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Tourist = require('../models/Tourist');
const Alert = require('../models/Alert');

// @route   POST /api/emergency/panic
// @desc    Trigger a panic alert from the mobile app
// @access  Private (Tourist only)
router.post('/panic', auth, async (req, res) => {
    const { location } = req.body;

    if (!location || !location.latitude || !location.longitude) {
        return res.status(400).json({ msg: 'Location is required' });
    }

    try {
        const tourist = await Tourist.findById(req.user.id);
        if (!tourist) {
            return res.status(404).json({ msg: 'Tourist not found' });
        }

        // Create a new alert
        const newAlert = new Alert({
            tourist: tourist.id,
            type: 'PANIC',
            location,
            message: `Panic button activated by ${tourist.name}`,
        });

        await newAlert.save();

        // Update tourist status
        tourist.status = 'alert';
        await tourist.save();

        // Emit a real-time event to the dashboard
        if (global.io) {
            const alertData = await Alert.findById(newAlert.id).populate('tourist', 'name nationality');
            global.io.to('dashboard-room').emit('new-alert', alertData);
        }

        // Optionally, send notifications (email, SMS) to emergency contacts/staff
        // sendEmergencyNotifications(tourist, location);

        res.json({ msg: 'Panic alert received. Help is on the way.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
