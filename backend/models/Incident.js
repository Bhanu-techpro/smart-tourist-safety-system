const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    alert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alert',
        required: true,
    },
    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tourist',
        required: true,
    },
    type: {
        type: String,
        enum: ['Medical', 'Security', 'Lost', 'Other'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    actionsTaken: [String],
    status: {
        type: String,
        enum: ['Open', 'In-Progress', 'Closed'],
        default: 'Open',
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Dashboard staff
        required: true,
    },
    resolutionDetails: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Incident', IncidentSchema);
