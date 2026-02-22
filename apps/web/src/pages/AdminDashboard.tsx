import { Typography, Grid, Card, CardContent, Box, LinearProgress } from '@mui/material';
import { Users, Calendar, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function AdminDashboard() {
    const stats = [
        { title: 'Total Members', value: '452', change: '+12%', trend: 'up', icon: Users, color: 'blue' },
        { title: 'Meetings This Month', value: '28', change: '+4%', trend: 'up', icon: Calendar, color: 'green' },
        { title: 'Fundraising Goal', value: '74%', change: '-2%', trend: 'down', icon: TrendingUp, color: 'purple' },
        { title: 'Overdue Follow-ups', value: '7', change: '+3', trend: 'down', icon: AlertCircle, color: 'red' },
    ];

    return (
        <DashboardLayout>
            <div className="mb-8">
                <Typography variant="h4" fontWeight="bold">Executive Overview</Typography>
                <Typography color="textSecondary">Global analytics and performance tracking for all church departments.</Typography>
            </div>

            <Grid container spacing={3} mb={6}>
                {stats.map((stat) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.title}>
                        <Card sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                    <div className={`p-2 rounded-lg bg-${stat.color}-500/10 text-${stat.color}-600`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <Box display="flex" alignItems="center" gap={0.5} color={stat.trend === 'up' ? 'success.main' : 'error.main'}>
                                        <Typography variant="caption" fontWeight="bold">{stat.change}</Typography>
                                        {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    </Box>
                                </Box>
                                <Typography variant="h4" fontWeight="bold" mb={0.5}>{stat.value}</Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    {stat.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                    <Card sx={{ borderRadius: 3, height: '100%' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" fontWeight="bold" mb={3}>Departmental Performance</Typography>
                            <Box display="flex" flexDirection="column" gap={4}>
                                {[
                                    { name: 'Youth Ministry', progress: 85, color: 'blue' },
                                    { name: 'Media & Tech', progress: 92, color: 'green' },
                                    { name: 'Hospitality', progress: 68, color: 'orange' },
                                    { name: 'Sunday School', progress: 45, color: 'red' },
                                ].map((dept) => (
                                    <div key={dept.name}>
                                        <Box display="flex" justifyContent="space-between" mb={1}>
                                            <Typography variant="body2" fontWeight="medium">{dept.name}</Typography>
                                            <Typography variant="body2" fontWeight="bold">{dept.progress}%</Typography>
                                        </Box>
                                        <LinearProgress variant="determinate" value={dept.progress} sx={{ height: 8, borderRadius: 4 }} />
                                    </div>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Card sx={{ borderRadius: 3, height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" mb={3}>Recent Activity</Typography>
                            <Box display="flex" flexDirection="column" gap={3}>
                                {[
                                    { user: 'John Doe', action: 'completed a meeting follow-up', time: '2h ago' },
                                    { user: 'Sarah Smith', action: 'created a new budget target', time: '5h ago' },
                                    { user: 'Media Team', action: 'posted a new announcement', time: '1d ago' },
                                    { user: 'Youth Dept', action: 'added 5 new volunteers', time: '2d ago' },
                                ].map((activity, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                                        <div>
                                            <Typography variant="body2">
                                                <span className="font-bold">{activity.user}</span> {activity.action}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">{activity.time}</Typography>
                                        </div>
                                    </div>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}
