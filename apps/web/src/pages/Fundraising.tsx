import { useQuery } from '@tanstack/react-query';
import api from '../lib/api-client';
import {
    Card, CardContent, Typography, Grid, Button, LinearProgress, Box, Chip
} from '@mui/material';
import { Plus, Wallet, TrendingUp, Users } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';

export default function Fundraising() {
    const { data: budgets, isLoading } = useQuery(['budgets'], async () => {
        const res = await api.get('/budgets');
        return res.data;
    });

    const getProgress = (raised: number, target: number) => {
        return Math.min((raised / target) * 100, 100);
    };

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Typography variant="h4" fontWeight="bold">Fundraising & Budgets</Typography>
                    <Typography color="textSecondary">Track financial targets and contributor progress across departments.</Typography>
                </div>
                <Button variant="contained" startIcon={<Plus size={18} />} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                    Create Budget
                </Button>
            </div>

            <Grid container spacing={4} mb={8}>
                {isLoading ? <Typography p={3}>Loading budgets...</Typography> : budgets?.map((budget: any) => (
                    <Grid item xs={12} md={6} lg={4} key={budget.id}>
                        <Card sx={{ borderRadius: 3, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                            <CardContent sx={{ p: 4 }}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                                        <Wallet size={20} />
                                    </div>
                                    <Chip label={budget.status} size="small" color={budget.status === 'OPEN' ? 'success' : 'default'} />
                                </div>

                                <Typography variant="h6" fontWeight="bold" gutterBottom>{budget.title}</Typography>
                                <Typography variant="body2" color="textSecondary" mb={3}>{budget.department?.name}</Typography>

                                <Box mb={1} display="flex" justifyContent="space-between">
                                    <Typography variant="body2" fontWeight="medium">Progress</Typography>
                                    <Typography variant="body2" fontWeight="bold">
                                        {getProgress(budget.amountRaised, budget.targetAmount).toFixed(1)}%
                                    </Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={getProgress(budget.amountRaised, budget.targetAmount)}
                                    sx={{ height: 10, borderRadius: 5, mb: 3 }}
                                />

                                <div className="flex justify-between items-end">
                                    <div>
                                        <Typography variant="caption" color="textSecondary uppercase block">Raised</Typography>
                                        <Typography variant="subtitle1" fontWeight="bold">${budget.amountRaised.toLocaleString()}</Typography>
                                    </div>
                                    <div className="text-right">
                                        <Typography variant="caption" color="textSecondary uppercase block">Target</Typography>
                                        <Typography variant="subtitle1" fontWeight="bold">${budget.targetAmount.toLocaleString()}</Typography>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </DashboardLayout>
    );
}
