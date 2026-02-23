import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api-client';
import {
    Typography, Grid, Card, CardContent, Box, Button, TextField, Dialog, DialogTitle,
    DialogContent, DialogActions, MenuItem, LinearProgress, Chip, IconButton, Tooltip,
    Paper, Avatar, AvatarGroup, Divider
} from '@mui/material';
import {
    Calendar, MapPin, Users, DollarSign, Plus, Edit, Trash2,
    ChevronRight, Filter, Search, MoreVertical, Clock,
    Tag, AlertCircle, CheckCircle2
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

export default function Events() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [editEvent, setEditEvent] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        departmentId: user?.departmentId || '',
        budgetNeeded: 0,
        volunteersNeeded: 0,
        status: 'PLANNED'
    });

    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    const { data: events, isLoading } = useQuery(['events'], async () => {
        const res = await api.get(isSuperAdmin ? '/events' : `/events/department/${user?.departmentId}`);
        return res.data;
    });

    const { data: departments } = useQuery(['departments'], async () => {
        const res = await api.get('/departments');
        return res.data;
    });

    const createMutation = useMutation(
        (newEvent: any) => api.post('/events', newEvent),
        { onSuccess: () => { queryClient.invalidateQueries(['events']); handleClose(); } }
    );

    const updateMutation = useMutation(
        (updatedEvent: any) => api.put(`/events/${updatedEvent.id}`, updatedEvent),
        { onSuccess: () => { queryClient.invalidateQueries(['events']); handleClose(); } }
    );

    const deleteMutation = useMutation(
        (id: string) => api.delete(`/events/${id}`),
        { onSuccess: () => queryClient.invalidateQueries(['events']) }
    );

    const handleOpen = (event: any = null) => {
        if (event) {
            setEditEvent(event);
            setFormData({
                ...event,
                date: new Date(event.date).toISOString().split('T')[0],
                departmentId: event.departmentId
            });
        } else {
            setEditEvent(null);
            setFormData({
                title: '',
                date: '',
                time: '',
                location: '',
                departmentId: user?.departmentId || '',
                budgetNeeded: 0,
                volunteersNeeded: 0,
                status: 'PLANNED'
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditEvent(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editEvent) {
            updateMutation.mutate({ ...formData, id: editEvent.id });
        } else {
            createMutation.mutate(formData);
        }
    };

    if (isLoading) return (
        <DashboardLayout>
            <Box sx={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LinearProgress sx={{ width: 200, borderRadius: 1 }} />
            </Box>
        </DashboardLayout>
    );

    return (
        <DashboardLayout>
            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <Typography variant="h4" fontWeight="900" sx={{ mb: 1, letterSpacing: -1 }}>
                        Mission Deployment
                    </Typography>
                    <Typography color="textSecondary" fontWeight="medium">
                        Strategic scheduling and resource mobilization across sectors.
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={() => handleOpen()}
                    sx={{ borderRadius: 2, px: 3, py: 1.5, fontWeight: '900', textTransform: 'none', boxShadow: 4 }}
                >
                    Initialize Event
                </Button>
            </Box>

            <Grid container spacing={3}>
                {events?.map((event: any) => (
                    <Grid item xs={12} md={6} lg={4} key={event.id}>
                        <Card className="holographic-card" sx={{
                            borderRadius: 4,
                            border: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="start" mb={3}>
                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                        <Calendar size={24} />
                                    </div>
                                    <Box display="flex" gap={1}>
                                        <Tooltip title="Modify Profile"><IconButton size="small" onClick={() => handleOpen(event)}><Edit size={16} /></IconButton></Tooltip>
                                        <Tooltip title="Terminated Deployment"><IconButton size="small" color="error" onClick={() => deleteMutation.mutate(event.id)}><Trash2 size={16} /></IconButton></Tooltip>
                                    </Box>
                                </Box>

                                <Typography variant="h6" fontWeight="900" sx={{ mb: 1 }}>{event.title}</Typography>
                                <Typography variant="caption" fontWeight="900" sx={{ color: 'primary.main', textTransform: 'uppercase', mb: 2, display: 'block' }}>
                                    {event.department?.name} Sector
                                </Typography>

                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Clock size={16} className="text-primary" />
                                        <span className="font-bold">{new Date(event.date).toDateString()} • {event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <MapPin size={16} className="text-primary" />
                                        <span className="font-bold">{event.location}</span>
                                    </div>
                                </div>

                                <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'action.hover' }}>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Budget</Typography>
                                            <Typography variant="subtitle1" fontWeight="800">${event.budgetNeeded.toLocaleString()}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'action.hover' }}>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>Units</Typography>
                                            <Typography variant="subtitle1" fontWeight="800">{event.volunteersNeeded} Enlisted</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Chip
                                        label={event.status}
                                        size="small"
                                        color={event.status === 'COMPLETED' ? 'success' : 'primary'}
                                        sx={{ fontWeight: 'bold' }}
                                    />
                                    <AvatarGroup max={3}>
                                        <Avatar sx={{ width: 24, height: 24, fontSize: 10 }}>+</Avatar>
                                    </AvatarGroup>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: '900', pt: 4, px: 4 }}>
                        {editEvent ? 'Modify Mission Profile' : 'New Deployment Initialization'}
                    </DialogTitle>
                    <DialogContent sx={{ px: 4 }}>
                        <Box display="flex" flexDirection="column" gap={3} sx={{ pt: 2 }}>
                            <TextField
                                label="Mission Title"
                                fullWidth
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <Box display="flex" gap={2}>
                                <TextField
                                    label="Date"
                                    type="date"
                                    fullWidth
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                                <TextField
                                    label="Time"
                                    type="time"
                                    fullWidth
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                />
                            </Box>
                            <TextField
                                label="Operational Node (Location)"
                                fullWidth
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                            {isSuperAdmin && (
                                <TextField
                                    label="Target Sector (Department)"
                                    select
                                    fullWidth
                                    required
                                    value={formData.departmentId}
                                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                                    SelectProps={{ inputProps: { tabIndex: -1 } }}
                                >
                                    {departments?.map((dept: any) => (
                                        <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                            <Box display="flex" gap={2}>
                                <TextField
                                    label="Budget Needed ($)"
                                    type="number"
                                    fullWidth
                                    value={formData.budgetNeeded}
                                    onChange={(e) => setFormData({ ...formData, budgetNeeded: Number(e.target.value) })}
                                />
                                <TextField
                                    label="Personnel Units Required"
                                    type="number"
                                    fullWidth
                                    value={formData.volunteersNeeded}
                                    onChange={(e) => setFormData({ ...formData, volunteersNeeded: Number(e.target.value) })}
                                />
                            </Box>
                            <TextField
                                label="Mission Status"
                                select
                                fullWidth
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                SelectProps={{ inputProps: { tabIndex: -1 } }}
                            >
                                <MenuItem value="PLANNED">Planned</MenuItem>
                                <MenuItem value="ACTIVE">Active Deployment</MenuItem>
                                <MenuItem value="COMPLETED">Mission Accomplished</MenuItem>
                                <MenuItem value="CANCELLED">Aborted</MenuItem>
                            </TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 4 }}>
                        <Button onClick={handleClose} sx={{ fontWeight: 'bold' }}>Abort</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={createMutation.isLoading || updateMutation.isLoading}
                            sx={{ borderRadius: 2, px: 4, fontWeight: 'bold' }}
                        >
                            Confirm Initial
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </DashboardLayout >
    );
}
