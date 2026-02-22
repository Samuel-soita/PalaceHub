import { useQuery } from '@tanstack/react-query';
import api from '../lib/api-client';
import {
    Card, CardContent, Typography, Grid, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';
import { Plus, Users } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function Departments() {
    const { data: departments, isLoading } = useQuery(['departments'], async () => {
        const res = await api.get('/departments');
        return res.data;
    });

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Typography variant="h4" fontWeight="bold">Departments</Typography>
                    <Typography color="textSecondary">Manage church departments and their leadership.</Typography>
                </div>
                <Button variant="contained" startIcon={<Plus size={18} />} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                    Add Department
                </Button>
            </div>

            <Grid container spacing={4} mb={6}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                            <Users size={24} />
                        </div>
                        <div>
                            <Typography variant="h6" fontWeight="bold">{departments?.length || 0}</Typography>
                            <Typography variant="body2" color="textSecondary text-sm uppercase">Total Departments</Typography>
                        </div>
                    </Card>
                </Grid>
            </Grid>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Department Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Leader</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={5} align="center">Loading...</TableCell></TableRow>
                        ) : departments?.map((dept: any) => (
                            <TableRow key={dept.id} hover>
                                <TableCell>
                                    <Typography fontWeight="medium">{dept.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">{dept.description || 'No description'}</Typography>
                                </TableCell>
                                <TableCell>{dept.leaders?.[0]?.name || 'Unassigned'}</TableCell>
                                <TableCell>
                                    <Chip label="Active" color="success" size="small" variant="outlined" />
                                </TableCell>
                                <TableCell>{new Date(dept.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button size="small" sx={{ textTransform: 'none' }}>View Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardLayout>
    );
}
