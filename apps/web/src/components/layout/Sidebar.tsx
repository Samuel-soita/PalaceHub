import { LayoutDashboard, Users, Calendar, Wallet, Settings, Bell, MessageCircle, ClipboardCheck, Package, Map } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="w-64 bg-sidebar border-r border-border min-h-screen flex flex-col">
            <div className="p-6">
                <h1 className="text-xl font-bold text-sidebar-foreground">ChurchHub CDMS</h1>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sidebar-foreground hover:bg-border/50",
                                isActive && "bg-primary/10 text-primary font-medium"
                            )}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-border">
                <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-border/50">
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </div>
        </aside>
    );
}
