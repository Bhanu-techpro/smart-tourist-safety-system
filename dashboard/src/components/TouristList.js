import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import api from '../services/api';

export default function TouristList() {
    const [tourists, setTourists] = useState([]);

    useEffect(() => {
        // This should fetch all tourists, not just active ones
        // Assuming an endpoint /api/dashboard/all-tourists exists
        api.get('/dashboard/tourists').then(res => {
            setTourists(res.data);
        });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Last Location Update</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tourists.map((tourist) => (
                        <TableRow key={tourist.id}>
                            <TableCell>{tourist.name}</TableCell>
                            <TableCell>{tourist.status}</TableCell>
                            <TableCell>
                                {tourist.lastLocation 
                                    ? new Date(tourist.lastLocation.timestamp).toLocaleString() 
                                    : 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
