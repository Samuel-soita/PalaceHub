import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api-client';
import {
    Card, CardContent, Typography, Grid, Button, Box, Chip,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem,
    IconButton, Tooltip, Avatar, AvatarGroup
} from '@mui/material';
import { Plus, Users, UserPlus, Mail, Edit, Trash2, Award, CheckCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

export default function Volunteers() {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [editVolunteer, setEditVolunteer] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        skills: '',
        availability: '',
        departmentId: '',
        status: 'ACTIVE'
    });

    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    const { data: volunteers, isLoading } = useQuery(['volunteers'], async () => {
        const url = isSuperAdmin ? '/volunteers' : `/volunteers/department/${user?.departmentId}`;
        const res = await api.get(url);
        return res.data;
    });

    const { data: departments } = useQuery(['departments'], async () => {
        const res = await api.get('/departments');
        return res.data;
    }, { enabled: isSuperAdmin });

    const createMutation = useMutation((data: any) => api.post('/volunteers', data), {
        onSuccess: () => {
            queryClient.invalidateQueries(['volunteers']);
            handleClose();
        }
    });

    const updateMutation = useMutation((data: any) => api.put(`/volunteers/${editVolunteer.id}`, data), {
        onSuccess: () => {
            queryClient.invalidateQueries(['volunteers']);
            handleClose();
        }
    });

    const deleteMutation = useMutation((id: string) => api.delete(`/volunteers/${id}`), {
        onSuccess: () => queryClient.invalidateQueries(['volunteers'])
    });

    const handleOpen = (v: any = null) => {
        if (v) {
            setEditVolunteer(v);
            setFormData({
                name: v.name,
                email: v.email || '',
                skills: v.skills || '',
                availability: v.availability || '',
                departmentId: v.departmentId,
                status: v.status
            });
        } else {
            setEditVolunteer(null);
            setFormData({
                name: '',
                email: '',
                skills: '',
                availability: '',
                departmentId: isSuperAdmin ? '' : user?.departmentId || '',
                status: 'ACTIVE'
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditVolunteer(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editVolunteer) {
            updateMutation.mutate(formData);
        } else {
            createMutation.mutate(formData);
        }
    };

    return (
        <DashboardLayout>
            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <Typography variant="h4" fontWeight="900" sx={{ letterSpacing: -1, mb: 1 }}>
                        Personnel Operations
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        Managing volunteer deployment and departmental capacity.
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    sx={{ borderRadius: 2, px: 3, py: 1.5, fontWeight: 'bold', textTransform: 'none' }}
                    startIcon={<UserPlus size={20} />}
                    onClick={() => handleOpen()}
                >
                    Enlist Volunteer
                </Button>
            </Box>

            <Grid container spacing={3} mb={6}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 4, display: 'flex', alignItems: 'center', p: 3, border: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'primary.main', color: 'white', mr: 3 }}>
                            <Users size={28} />
                        </Box>
                        <div>
                            <Typography variant="h4" fontWeight="bold">{volunteers?.length || 0}</Typography>
                            <Typography variant="body2" color="textSecondary">Active Personnel</Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 4, display: 'flex', alignItems: 'center', p: 3, border: '1px solid', borderColor: 'divider' }}>
                        <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'success.main', color: 'white', mr: 3 }}>
                            <Award size={28} />
                        </Box>
                        <div>
                            <Typography variant="h4" fontWeight="bold">
                                {volunteers?.filter((v: any) => v.skills?.length > 0).length || 0}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">Skilled Units</Typography>
                        </div>
                    </Card>
                </Grid>
            </Grid>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: '800' }}>Unit Name</TableCell>
                            <TableCell sx={{ fontWeight: '800' }}>Specialization</TableCell>
                            <TableCell sx={{ fontWeight: '800' }}>Deployment</TableCell>
                            <TableCell sx={{ fontWeight: '800' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: '800' }} align="right">Command</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={5} align="center" sx={{ py: 8 }}>Scanning registry...</TableCell></TableRow>
                        ) : volunteers?.map((v: any) => (
                            <TableRow key={v.id} hover>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar sx={{ bgcolor: 'primary.light', fontWeight: 'bold', fontSize: '0.875rem' }}>
                                            {v.name.charAt(0)}
                                        </Avatar>
                                        <div>
                                            <Typography fontWeight="700">{v.name}</Typography>
                                            <Typography variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Mail size={12} /> {v.email || 'No communication link'}
                                            </Typography>
                                        </div>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                                        {v.skills ? v.skills.split(',').map((s: string) => (
                                            <Chip key={s} label={s.trim()} size="small" variant="outlined" sx={{ fontSize: '0.7rem', fontWeight: 'bold' }} />
                                        )) : <Typography variant="caption" color="textSecondary">General Personnel</Typography>}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="500">{v.department?.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">{v.availability || 'Flexible availability'}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={v.status}
                                        color={v.status === 'ACTIVE' ? 'success' : 'default'}
                                        size="small"
                                        sx={{ fontWeight: 'bold' }}
                                        icon={v.status === 'ACTIVE' ? <CheckCircle size={14} /> : undefined}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edit Profile">
                                        <IconButton onClick={() => handleOpen(v)} size="small" color="primary"><Edit size={18} /></IconButton>
                                    </Tooltip>
                                    <Tooltip title="Deactivate">
                                        <IconButton onClick={() => deleteMutation.mutate(v.id)} size="small" color="error"><Trash2 size={18} /></IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: '900', pt: 4, px: 4 }}>
                        {editVolunteer ? 'Modify Unit Profile' : 'Personnel Enlistment'}
                    </DialogTitle>
                    <DialogContent sx={{ px: 4 }}>
                        <Box display="flex" flexDirection="column" gap={3} sx={{ pt: 2 }}>
                            <TextField
                                label="Full Legal Name"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <TextField
                                label="Communication Email"
                                type="email"
                                fullWidth
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <TextField
                                label="Specializations (Comma separated)"
                                fullWidth
                                placeholder="Media, Youth, Music, Finance"
                                value={formData.skills}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            />
                            <TextField
                                label="Operational Availability"
                                fullWidth
                                placeholder="e.g. Weekends, Evenings"
                                value={formData.availability}
                                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            />
                            {isSuperAdmin && (
                                <TextField
                                    label="Assigned Department"
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
                            <TextField
                                label="Status"
                                select
                                fullWidth
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                SelectProps={{ inputProps: { tabIndex: -1 } }}
                            >
                                <MenuItem value="ACTIVE">Active Deployment</MenuItem>
                                <MenuItem value="INACTIVE">Inactive / Standby</MenuItem>
                                <MenuItem value="ON_LEAVE">On Leave</MenuItem>
                            </TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 4 }}>
                        <Button onClick={handleClose} sx={{ fontWeight: 'bold' }}>Abort</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={createMutation.isLoading || updateMutation.isLoading}
                            sx={{ borderRadius: 2, px: 4, fontWeight: 'bold' }}
                        >
                            {editVolunteer ? 'Update Deployment' : 'Confirm Enlistment'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </DashboardLayout>
    );
}
