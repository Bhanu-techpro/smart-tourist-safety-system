import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function TouristMap({ tourists }) {
    const defaultPosition = [20.5937, 78.9629]; // Default center of India

    return (
        <MapContainer center={defaultPosition} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {tourists.map(tourist => (
                tourist.lastLocation && (
                    <Marker 
                        key={tourist.id} 
                        position={[tourist.lastLocation.latitude, tourist.lastLocation.longitude]}
                    >
                        <Popup>
                            <b>{tourist.name}</b><br />
                            Status: {tourist.status}
                        </Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
}
