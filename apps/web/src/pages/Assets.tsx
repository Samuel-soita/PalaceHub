import { Box, Typography, Paper } from '@mui/material';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function Assets() {
    return (
        <DashboardLayout>
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Assets</Typography>
                <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                    <Typography color="textSecondary">Asset management coming soon.</Typography>
                </Paper>
            </Box>
        </DashboardLayout>
    );
}
