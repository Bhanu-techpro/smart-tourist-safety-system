const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist',
        required: true,
    },
    type: {
        type: String,
        enum: ['PANIC', 'GEOFENCE_VIOLATION', 'ANOMALY_DETECTED', 'SYSTEM'],
        required: true,
    },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ['new', 'acknowledged', 'resolved'],
        default: 'new',
    },
    acknowledgedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming a User model for dashboard staff
    },
    resolvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

module.exports = mongoose.model('Alert', AlertSchema);
