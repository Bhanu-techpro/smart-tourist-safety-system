import React, { useState, useEffect } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Chip } from '@mui/material';
import api from '../services/api';

export default function Alerts() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        api.get('/dashboard/alerts').then(res => {
            setAlerts(res.data.alerts);
        });
    }, []);

    const getChipColor = (status) => {
        if (status === 'new') return 'error';
        if (status === 'acknowledged') return 'warning';
        return 'success';
    };

    return (
        <Paper>
            <Typography variant="h4" sx={{ p: 2 }}>
                All Alerts
            </Typography>
            <List>
                {alerts.map(alert => (
                    <ListItem key={alert._id} divider>
                        <ListItemText
                            primary={`${alert.type}: ${alert.message}`}
                            secondary={`Tourist: ${alert.tourist?.name} | Time: ${new Date(alert.createdAt).toLocaleString()}`}
                        />
                        <Chip label={alert.status} color={getChipColor(alert.status)} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}
