const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Incident = require('../models/Incident');
const Alert = require('../models/Alert');

// @route   POST /api/incidents/report
// @desc    Create a new incident report
// @access  Admin/Operator
router.post(
    '/report',
    [
        auth,
        admin,
        [
            body('alertId', 'Alert ID is required').not().isEmpty(),
            body('touristId', 'Tourist ID is required').not().isEmpty(),
            body('type', 'Incident type is required').not().isEmpty(),
            body('description', 'Description is required').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { alertId, touristId, type, description, actionsTaken, status } = req.body;

        try {
            const newIncident = new Incident({
                alert: alertId,
                tourist: touristId,
                type,
                description,
                actionsTaken,
                status,
                reportedBy: req.user.id, // Assumes dashboard user ID
            });

            const incident = await newIncident.save();

            // Mark the associated alert as 'resolved'
            await Alert.findByIdAndUpdate(alertId, { status: 'resolved' });

            // Emit update to dashboards
            if (global.io) {
                global.io.to('dashboard-room').emit('incident-update', incident);
            }

            res.status(201).json(incident);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   GET /api/incidents
// @desc    Get all incident reports
// @access  Admin/Operator
router.get('/', [auth, admin], async (req, res) => {
    try {
        const incidents = await Incident.find()
            .populate('tourist', 'name nationality')
            .populate('reportedBy', 'name')
            .sort({ createdAt: -1 });
        res.json(incidents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
