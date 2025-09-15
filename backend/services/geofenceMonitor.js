const Tourist = require('../models/Tourist');
const Geofence = require('../models/Geofence');
const Alert = require('../models/Alert');

// Debounce map to prevent alert spam for the same tourist in the same zone
const alertDebounce = new Map();
const DEBOUNCE_DURATION = 1000 * 60 * 30; // 30 minutes

/**
 * Checks all active tourists against all geofence zones.
 */
async function checkAllTourists() {
    try {
        const activeTourists = await Tourist.find({
            status: 'active',
            lastLocation: { $exists: true },
        });

        if (activeTourists.length === 0) {
            return; // No active tourists to check
        }

        for (const tourist of activeTourists) {
            // Find any geofence zones that the tourist's last location intersects with
            const intersectingZones = await Geofence.find({
                location: {
                    $geoIntersects: {
                        $geometry: tourist.lastLocation,
                    },
                },
            });

            if (intersectingZones.length > 0) {
                for (const zone of intersectingZones) {
                    await handleGeofenceViolation(tourist, zone);
                }
            }
        }
    } catch (error) {
        console.error('[GeofenceMonitor] Error checking tourists:', error);
    }
}

/**
 * Handles the logic when a tourist is found inside a geofence zone.
 * @param {object} tourist The tourist document.
 * @param {object} zone The geofence zone document.
 */
async function handleGeofenceViolation(tourist, zone) {
    const debounceKey = `${tourist._id.toString()}-${zone._id.toString()}`;
    const lastAlertTime = alertDebounce.get(debounceKey);

    // If an alert was sent for this tourist in this zone within the debounce duration, ignore it.
    if (lastAlertTime && (Date.now() - lastAlertTime < DEBOUNCE_DURATION)) {
        return;
    }

    try {
        // Create a new alert in the database
        const newAlert = new Alert({
            tourist: tourist._id,
            type: 'GEOFENCE_VIOLATION',
            location: {
                latitude: tourist.lastLocation.coordinates[1],
                longitude: tourist.lastLocation.coordinates[0],
            },
            message: `Tourist '${tourist.name}' entered high-risk zone '${zone.name}' (Risk Level: ${zone.riskLevel}).`,
        });
        await newAlert.save();

        // Emit a real-time event to the dashboard
        // Assumes 'io' is a global object from server.js
        if (global.io) {
            global.io.to('dashboard-room').emit('new-alert', newAlert);
            console.log(`[GeofenceMonitor] Alert sent for tourist ${tourist.name} in zone ${zone.name}`);
        }

        // Update the debounce map with the current timestamp
        alertDebounce.set(debounceKey, Date.now());

    } catch (error) {
        console.error(`[GeofenceMonitor] Error handling violation for tourist ${tourist._id}:`, error);
    }
}

/**
 * Starts the continuous monitoring service.
 * @param {number} interval The interval in milliseconds to check locations.
 */
function startMonitoring(interval = 1000 * 60) { // Default to every 1 minute
    console.log('[GeofenceMonitor] Starting geofence monitoring service...');
    setInterval(checkAllTourists, interval);
}

module.exports = { startMonitoring };
