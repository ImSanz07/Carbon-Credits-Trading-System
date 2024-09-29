"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const DisplayFarmers = () => {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const res = await axios.get('/api/msme/fetchFarmers'); // Using Axios to fetch data
                setFarmers(res.data);
            } catch (error) {
                console.error("Failed to fetch farmers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFarmers();
    }, []);

    if (loading) {
        return <div>Loading farmers...</div>; // Loading state
    }

    return (
        <div className="w-3/4 mx-auto"> {/* Centering the table and limiting its width to 75% */}
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Farmer Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Carbon Credits</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {farmers.length > 0 ? (
                        farmers.map((farmer, index) => (
                            <TableRow key={farmer._id}>
                                <TableCell className="font-medium">INV00{index + 1}</TableCell> {/* Example Invoice */}
                                <TableCell>{farmer.name}</TableCell>
                                <TableCell>{farmer.location || 'N/A'}</TableCell> {/* Assuming 'location' is part of your schema */}
                                <TableCell className="text-right">{farmer.carbonCredits}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No farmers available.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default DisplayFarmers;
