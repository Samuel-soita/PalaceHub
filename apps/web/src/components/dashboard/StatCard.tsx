import { Box, Card, CardContent, Typography } from '@mui/material';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down';
    icon: any;
    color: string;
}

export const StatCard = ({ title, value, change, trend, icon: Icon, color }: StatCardProps) => (
    <Card className="holographic-card smooth-tilt" sx={{
        height: '100%',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        overflow: 'hidden',
        background: 'var(--glass)',
    }}>
        <CardContent sx={{ p: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="start" mb={3}>
                <div className={`p-3 rounded-2xl bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-h),var(--primary-s),var(--primary-l),0.2)]`}>
                    <Icon size={26} />
                </div>
                {change && (
                    <Box display="flex" alignItems="center" gap={0.5}
                        sx={{
                            px: 1.5, py: 0.5,
                            borderRadius: 'var(--radius-md)',
                            bgcolor: trend === 'up' ? 'success.main/10' : 'error.main/10',
                            color: trend === 'up' ? 'success.main' : 'error.main',
                            border: '1px solid',
                            borderColor: trend === 'up' ? 'success.main/20' : 'error.main/20'
                        }}>
                        <Typography variant="caption" fontWeight="900" sx={{ letterSpacing: 0.5 }}>{change}</Typography>
                        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </Box>
                )}
            </Box>
            <Typography variant="h2" fontWeight="950" sx={{ mb: 1, letterSpacing: -3, color: 'text.primary', fontSize: { xs: '2rem', md: '2.5rem' } }}>{value}</Typography>
            <Typography className="neon-label" sx={{ letterSpacing: '0.25em !important' }}>
                {title}
            </Typography>
        </CardContent>
    </Card>
);
