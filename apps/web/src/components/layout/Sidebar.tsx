import { LayoutDashboard, Users, Calendar, Wallet, Settings, Bell, MessageCircle, ClipboardCheck, Package, Map, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Box, Typography, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Departments', href: '/departments', icon: Users },
    { name: 'Meetings', href: '/meetings', icon: Calendar },
    { name: 'Fundraising', href: '/fundraising', icon: Wallet },
    { name: 'Volunteers', href: '/volunteers', icon: ClipboardCheck },
    { name: 'Announcements', href: '/announcements', icon: Bell },
    { name: 'Prayer Requests', href: '/prayer-requests', icon: MessageCircle },
    { name: 'Assets', href: '/assets', icon: Package },
    { name: 'Strategy', href: '/strategy', icon: Map },
];

interface SidebarProps {
    open?: boolean;
    onClose?: () => void;
    mobile?: boolean;
}

const NavItem = ({ item, isActive, onClick }: { item: any, isActive: boolean, onClick?: () => void }) => (
    <Link
        to={item.href}
        onClick={onClick}
        className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 text-sidebar-foreground group relative overflow-hidden",
            isActive ? "bg-primary/20 text-primary font-bold border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "hover:bg-white/5 opacity-70 hover:opacity-100"
        )}
    >
        {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent animate-pulse" />
        )}
        <item.icon size={20} className={cn("transition-transform duration-500 group-hover:scale-110", isActive && "text-primary glow-text")} />
        <span className={cn("text-sm tracking-wide transition-all", isActive && "glow-text px-1")}>{item.name}</span>
        {isActive && (
            <div className="absolute right-0 w-1 h-6 bg-primary rounded-l-full shadow-[0_0_10px_var(--primary-glow)]" />
        )}
    </Link>
);

export default function Sidebar({ open, onClose, mobile }: SidebarProps) {
    const { user } = useAuth();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const SidebarContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'sidebar.background' }}>
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: -1 }}>
                    PALACE<span className="text-primary">HUB</span>
                </Typography>
                {mobile && (
                    <IconButton onClick={onClose} size="small">
                        <X size={20} />
                    </IconButton>
                )}
            </Box>

            <Box component="nav" sx={{ flex: 1, px: 2, spaceY: 0.5, overflowY: 'auto' }}>
                {navItems
                    .filter(item => {
                        if (item.name === 'Departments' && user?.role !== 'SUPER_ADMIN') return false;
                        return true;
                    })
                    .map((item) => (
                        <NavItem
                            key={item.name}
                            item={item}
                            isActive={location.pathname === item.href}
                            onClick={mobile ? onClose : undefined}
                        />
                    ))}
            </Box>

            <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-white/5 transition-all">
                    <Settings size={20} />
                    <span className="text-sm">System Settings</span>
                </Link>
            </Box>
        </Box>
    );

    if (mobile) {
        return (
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: { width: 280, bgcolor: 'background.default', borderRight: '1px solid', borderColor: 'divider' }
                }}
            >
                {SidebarContent}
            </Drawer>
        );
    }

    return (
        <aside className="w-64 bg-sidebar border-r border-border min-h-screen hidden md:flex flex-col">
            {SidebarContent}
        </aside>
    );
}
