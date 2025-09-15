// Placeholder for geofencing logic

// Example geofence zones (could be stored in a database)
const geofences = [
    {
        id: 'restricted-zone-1',
        name: 'Military Base Area',
        isRestricted: true,
        shape: 'polygon',
        coords: [
            { lat: 12.97, lng: 77.60 },
            { lat: 12.98, lng: 77.60 },
            { lat: 12.98, lng: 77.61 },
            { lat: 12.97, lng: 77.61 },
        ]
    },
    {
        id: 'safe-zone-hotel',
        name: 'Hotel Safe Zone',
        isRestricted: false, // This is a "leave" alert zone
        shape: 'circle',
        center: { lat: 12.9716, lng: 77.5946 },
        radius: 500 // in meters
    }
];

/**
 * Checks if a given point is inside a polygon.
 * @param {{latitude: number, longitude: number}} point - The point to check.
 * @param {Array<{lat: number, lng: number}>} polygon - The vertices of the polygon.
 * @returns {boolean} - True if the point is inside, false otherwise.
 */
function isPointInPolygon(point, polygon) {
    // Ray-casting algorithm
    let isInside = false;
    const x = point.latitude;
    const y = point.longitude;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].lat, yi = polygon[i].lng;
        const xj = polygon[j].lat, yj = polygon[j].lng;

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }

    return isInside;
}

/**
 * Checks a tourist's location against all defined geofences.
 * This function would be called whenever a tourist's location is updated.
 * @param {string} touristId - The ID of the tourist.
 * @param {{latitude: number, longitude: number}} location - The tourist's current location.
 */
function checkGeofences(touristId, location) {
    for (const fence of geofences) {
        let inZone = false;
        if (fence.shape === 'polygon') {
            inZone = isPointInPolygon(location, fence.coords);
        }
        // Add logic for circle if needed

        if (inZone && fence.isRestricted) {
            // Tourist entered a restricted zone
            console.log(`Alert: Tourist ${touristId} entered restricted zone ${fence.name}`);
            // Here you would create an Alert in the database and emit a WebSocket event
        }
    }
}

module.exports = {
    checkGeofences,
};
