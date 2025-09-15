import React from 'react';
import { Typography } from '@mui/material';
import IncidentReports from '../components/IncidentReports';

export default function Reports() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Incident Reports
            </Typography>
            <IncidentReports />
        </div>
    );
}
