import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Chip } from '@mui/material';

export default function AlertsPanel({ alerts }) {
    const getChipColor = (type) => {
        return type === 'PANIC' ? 'error' : 'warning';
    };

    return (
        <>
            <Typography variant="h6" sx={{ p: 2 }}>
                Real-time Alerts
            </Typography>
            <Divider />
            <List sx={{ maxHeight: '100%', overflow: 'auto' }}>
                {alerts.length === 0 && <ListItem><ListItemText primary="No new alerts." /></ListItem>}
                {alerts.map((alert) => (
                    <ListItem key={alert._id} divider>
                        <ListItemText
                            primary={alert.message}
                            secondary={`Time: ${new Date(alert.createdAt).toLocaleTimeString()}`}
                        />
                        <Chip label={alert.type} color={getChipColor(alert.type)} size="small" />
                    </ListItem>
                ))}
            </List>
        </>
    );
}
