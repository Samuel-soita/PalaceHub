import { Box, Typography, Paper } from '@mui/material';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function Volunteers() {
    return (
        <DashboardLayout>
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Volunteers</Typography>
                <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                    <Typography color="textSecondary">Volunteer management coming soon.</Typography>
                </Paper>
            </Box>
        </DashboardLayout>
    );
}
