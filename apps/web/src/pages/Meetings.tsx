import { useQuery } from '@tanstack/react-query';
import api from '../lib/api-client';
import {
    Card, CardContent, Typography, Grid, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';
import { Plus, Calendar, Clock, MapPin } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function Meetings() {
    const { data: meetings, isLoading } = useQuery(['meetings'], async () => {
        const res = await api.get('/meetings');
        return res.data;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SCHEDULED': return 'primary';
            case 'ONGOING': return 'warning';
            case 'COMPLETED': return 'success';
            case 'CANCELLED': return 'error';
            default: return 'default';
        }
    };

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Typography variant="h4" fontWeight="bold">Meetings</Typography>
                    <Typography color="textSecondary">Schedule and track departmental meetings and follow-ups.</Typography>
                </div>
                <Button variant="contained" startIcon={<Plus size={18} />} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                    New Meeting
                </Button>
            </div>

            <Grid container spacing={3} mb={6}>
                {isLoading ? <Typography p={3}>Loading meetings summary...</Typography> : meetings?.slice(0, 3).map((meeting: any) => (
                    <Grid item xs={12} md={4} key={meeting.id}>
                        <Card sx={{ borderLeft: '4px solid', borderLeftColor: 'primary.main', height: '100%' }}>
                            <CardContent>
                                <div className="flex justify-between items-start mb-2">
                                    <Chip label={meeting.meetingStatus} color={getStatusColor(meeting.meetingStatus) as any} size="small" />
                                    <Typography variant="caption" color="textSecondary">
                                        {new Date(meeting.date).toLocaleDateString()}
                                    </Typography>
                                </div>
                                <Typography variant="h6" fontWeight="bold" noWrap>{meeting.title}</Typography>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock size={16} /> <span>{meeting.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin size={16} /> <span>{meeting.venue}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Meeting Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Follow-up Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Meeting Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={5} align="center">Loading...</TableCell></TableRow>
                        ) : meetings?.map((meeting: any) => (
                            <TableRow key={meeting.id} hover>
                                <TableCell>
                                    <Typography fontWeight="medium">{meeting.title}</Typography>
                                    <Typography variant="caption" color="textSecondary">{new Date(meeting.date).toDateString()}</Typography>
                                </TableCell>
                                <TableCell>{meeting.department?.name}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={meeting.followUpStatus}
                                        size="small"
                                        variant="outlined"
                                        color={meeting.followUpStatus === 'OVERDUE' ? 'error' : 'default'}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip label={meeting.meetingStatus} color={getStatusColor(meeting.meetingStatus) as any} size="small" />
                                </TableCell>
                                <TableCell>
                                    <Button size="small" sx={{ textTransform: 'none' }}>Minutes</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardLayout>
    );
}
