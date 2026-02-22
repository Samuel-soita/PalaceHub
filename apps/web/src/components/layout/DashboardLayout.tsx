import Sidebar from './Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b border-border bg-background flex items-center px-8 justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-semibold">Overview</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                            S
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8 bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
}
