import React, { useState, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import TouristMap from '../components/TouristMap';
import AlertsPanel from '../components/AlertsPanel';
import api from '../services/api';
import { socket } from '../services/websocket';

export default function Dashboard() {
    const [tourists, setTourists] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Fetch initial data
        api.get('/dashboard/tourists').then(res => setTourists(res.data));
        api.get('/dashboard/alerts').then(res => setAlerts(res.data.alerts));

        // Listen for WebSocket events
        socket.connect();
        socket.emit('join-dashboard');

        socket.on('new-alert', (newAlert) => {
            setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
        });

        socket.on('tourist-location-update', (update) => {
            setTourists(prevTourists => 
                prevTourists.map(t => 
                    t.id === update.touristId ? { ...t, lastLocation: update.location } : t
                )
            );
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Grid container spacing={3}>
            {/* Tourist Map */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{ height: '70vh', p: 2 }}>
                    <TouristMap tourists={tourists} />
                </Paper>
            </Grid>
            {/* Alerts Panel */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{ height: '70vh', overflowY: 'auto' }}>
                    <AlertsPanel alerts={alerts} />
                </Paper>
            </Grid>
            {/* Other stats can go here */}
        </Grid>
    );
}
