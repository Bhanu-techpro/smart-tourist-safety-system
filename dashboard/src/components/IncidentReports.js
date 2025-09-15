import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import api from '../services/api';

export default function IncidentReports() {
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('/incidents').then(res => {
            setIncidents(res.data);
        });
    }, []);

    const getChipColor = (status) => {
        if (status === 'Open') return 'error';
        if (status === 'In-Progress') return 'warning';
        return 'success';
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Incident Type</TableCell>
                        <TableCell>Tourist</TableCell>
                        <TableCell>Reported By</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {incidents.map((incident) => (
                        <TableRow key={incident._id}>
                            <TableCell>{incident.type}</TableCell>
                            <TableCell>{incident.tourist?.name}</TableCell>
                            <TableCell>{incident.reportedBy?.name}</TableCell>
                            <TableCell>
                                <Chip label={incident.status} color={getChipColor(incident.status)} />
                            </TableCell>
                            <TableCell>{new Date(incident.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
