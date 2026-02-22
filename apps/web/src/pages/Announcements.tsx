import { Box, Typography, Paper } from '@mui/material';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function Announcements() {
    return (
        <DashboardLayout>
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Announcements</Typography>
                <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                    <Typography color="textSecondary">Announcements board coming soon.</Typography>
                </Paper>
            </Box>
        </DashboardLayout>
    );
}
