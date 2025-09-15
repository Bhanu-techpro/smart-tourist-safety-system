const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Tourist = require('../models/Tourist');
const Alert = require('../models/Alert');

// All routes in this file are protected and for dashboard users

// @route   GET /api/dashboard/tourists
// @desc    Get all active tourists for the map
// @access  Admin/Operator
router.get('/tourists', [auth, admin], async (req, res) => {
    try {
        const tourists = await Tourist.find({ status: 'active' })
            .select('name lastLocation status');
        res.json(tourists);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/dashboard/alerts
// @desc    Get all alerts
// @access  Admin/Operator
router.get('/alerts', [auth, admin], async (req, res) => {
    try {
        const { status, limit = 20, page = 1 } = req.query;
        const query = status ? { status } : {};

        const alerts = await Alert.find(query)
            .populate('tourist', 'name nationality')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .skip((page - 1) * limit);
            
        const total = await Alert.countDocuments(query);

        res.json({
            alerts,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST /api/dashboard/alerts/:id/acknowledge
// @desc    Acknowledge an alert
// @access  Admin/Operator
router.post('/alerts/:id/acknowledge', [auth, admin], async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);
        if (!alert) {
            return res.status(404).json({ msg: 'Alert not found' });
        }

        alert.status = 'acknowledged';
        alert.acknowledgedBy = req.user.id; // Assuming dashboard user has a User model
        await alert.save();

        // Emit update to dashboards
        if (global.io) {
            global.io.to('dashboard-room').emit('alert-update', alert);
        }

        res.json(alert);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
