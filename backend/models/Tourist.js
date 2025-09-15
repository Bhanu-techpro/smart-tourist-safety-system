const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmergencyContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true },
});

const ItinerarySchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    destinations: [String],
});

const LocationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
    },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });

const TouristSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    passportNumber: { type: String, required: true, unique: true }, // Should be encrypted
    
    itinerary: ItinerarySchema,
    emergencyContacts: [EmergencyContactSchema],

    digitalId: {
        address: { type: String, unique: true, sparse: true }, // Blockchain wallet address
        dataHash: { type: String },
        expiryTimestamp: { type: Date },
    },

    lastLocation: LocationSchema,
    locationHistory: [LocationSchema],

    role: { type: String, default: 'tourist' },
    status: { type: String, enum: ['pending', 'active', 'inactive', 'alert'], default: 'pending' },
}, { timestamps: true });

// Add geospatial index for efficient location queries
TouristSchema.index({ lastLocation: '2dsphere' });

// Password hashing middleware
TouristSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
TouristSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Tourist', TouristSchema);
