import { useState } from 'react';
import { Menu } from 'lucide-react';
import { IconButton, useMediaQuery, useTheme, Box } from '@mui/material';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar
                mobile={isMobile}
                open={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center px-4 md:px-8 justify-between">
                    <div className="flex items-center gap-4">
                        {isMobile && (
                            <IconButton onClick={() => setIsMobileMenuOpen(true)} sx={{ color: 'text.primary' }}>
                                <Menu size={24} />
                            </IconButton>
                        )}
                        <h2 className="text-lg font-bold tracking-tight">Executive Command</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <Box sx={{
                            w: 36, h: 36,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: '900',
                            fontSize: '0.8rem',
                            boxShadow: '0 0 15px var(--primary-glow)'
                        }}>
                            SA
                        </Box>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
