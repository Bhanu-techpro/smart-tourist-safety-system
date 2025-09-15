import React from 'react';
import { Typography } from '@mui/material';
import TouristList from '../components/TouristList';

export default function TouristManagement() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Tourist Management
            </Typography>
            <TouristList />
        </div>
    );
}
