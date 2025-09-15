const mongoose = require('mongoose');

const GeofenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    riskLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Example: 1=Low, 5=Very High
    },
    location: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true,
        },
        coordinates: {
            type: [[[Number]]], // Format for GeoJSON Polygon
            required: true,
        },
    },
}, { timestamps: true });

// Add geospatial index for efficient queries
GeofenceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Geofence', GeofenceSchema);
