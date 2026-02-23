import { Box, Typography, Chip, LinearProgress } from '@mui/material';
import { Shield } from 'lucide-react';

export const SectorMatrix = ({ departments }: { departments: any[] }) => (
    <Box display="flex" flexDirection="column" gap={6}>
        {departments?.map((dept: any) => (
            <div key={dept.id}>
                <Box display="flex" justifyContent="space-between" mb={1.5} alignItems="end">
                    <div>
                        <Typography className="neon-label" sx={{ fontSize: '0.6rem !important', mb: 0.5, opacity: 0.6 }}>Operational Sector</Typography>
                        <Typography variant="body1" fontWeight="950" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, letterSpacing: -0.5 }}>
                            <Shield size={20} className="text-primary" /> {dept.name}
                        </Typography>
                    </div>
                    <Typography variant="h6" fontWeight="950" className="glow-text" sx={{ color: 'primary.main' }}>92%</Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={92}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'primary.main/5',
                        border: '1px solid var(--glass-border)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: 'linear-gradient(90deg, var(--primary), var(--cyan))',
                            boxShadow: '0 0 10px var(--primary-glow)'
                        }
                    }}
                />
            </div>
        ))}
    </Box>
);
