import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api-client';
import {
    Typography, Grid, Card, CardContent, Box, Button, Chip, Divider
} from '@mui/material';
import { Calendar, Users, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function DepartmentDashboard() {
    const { id } = useParams();
    const { data: department, isLoading } = useQuery(['department', id], async () => {
        const res = await api.get(`/departments/${id}`);
        return res.data;
    });

    if (isLoading) return <DashboardLayout><Typography>Loading department...</Typography></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                        <Typography variant="h4" fontWeight="bold">{department?.name}</Typography>
                        <Chip label="Active" color="success" size="small" />
                    </Box>
                    <Typography color="textSecondary">{department?.description || 'Department specialized in church operations.'}</Typography>
                </div>
                <Button variant="outlined" startIcon={<Users size={18} />}>Manage Volunteers</Button>
            </div>

            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <Typography variant="h6" fontWeight="bold" mb={3}>Upcoming Meetings</Typography>
                    <div className="space-y-4">
                        {department?.meetings?.length > 0 ? department.meetings.map((meeting: any) => (
                            <Card key={meeting.id} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }} elevation={0}>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box display="flex" alignItems="center" gap={3}>
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center text-primary">
                                            <Typography variant="caption" fontWeight="bold">{new Date(meeting.date).toLocaleString('default', { month: 'short' })}</Typography>
                                            <Typography variant="body2" fontWeight="bold">{new Date(meeting.date).getDate()}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="subtitle1" fontWeight="bold">{meeting.title}</Typography>
                                            <Typography variant="body2" color="textSecondary">{meeting.venue} • {meeting.time}</Typography>
                                        </div>
                                    </Box>
                                    <Button endIcon={<ChevronRight size={16} />}>Details</Button>
                                </CardContent>
                            </Card>
                        )) : <Typography color="textSecondary">No upcoming meetings scheduled.</Typography>}
                    </div>

                    <Typography variant="h6" fontWeight="bold" mt={6} mb={3}>Recent Strategy Items</Typography>
                    <Card sx={{ borderRadius: 3 }}>
                        <CardContent>
                            {[
                                { title: 'Upgrade Media Equipment', status: 'In Progress', icon: Briefcase },
                                { title: 'Volunteer Training Workshop', status: 'Completed', icon: CheckCircle2 },
                                { title: 'Update Department Handbook', status: 'Pending', icon: Calendar },
                            ].map((item, i) => (
                                <div key={i}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" py={2}>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <item.icon size={20} className="text-muted-foreground" />
                                            <Typography variant="body2" fontWeight="medium">{item.title}</Typography>
                                        </Box>
                                        <Chip label={item.status} size="small" variant="outlined" />
                                    </Box>
                                    {i < 2 && <Divider />}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Typography variant="h6" fontWeight="bold" mb={3}>Leader Overview</Typography>
                    <Card sx={{ borderRadius: 3, bgcolor: 'primary.main', color: 'white' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box display="flex" alignItems="center" gap={2} mb={3}>
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
                                    {department?.leaders?.[0]?.name?.charAt(0) || 'L'}
                                </div>
                                <div>
                                    <Typography fontWeight="bold">{department?.leaders?.[0]?.name || 'Leader'}</Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.8 }}>Department Head</Typography>
                                </div>
                            </Box>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <div className="flex justify-between text-sm">
                                    <span>Assigned Volunteers</span>
                                    <span className="font-bold">{department?.volunteers?.length || 0}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Open Tasks</span>
                                    <span className="font-bold">12</span>
                                </div>
                            </Box>
                        </CardContent>
                    </Card>

                    <Typography variant="h6" fontWeight="bold" mt={6} mb={3}>Announcements</Typography>
                    <div className="space-y-4">
                        <Card sx={{ borderRadius: 3, borderLeft: '4px solid', borderLeftColor: 'warning.main' }}>
                            <CardContent>
                                <Typography variant="subtitle2" fontWeight="bold">Meeting Rescheduled</Typography>
                                <Typography variant="caption" color="textSecondary">The monthly review is moved to Friday.</Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
