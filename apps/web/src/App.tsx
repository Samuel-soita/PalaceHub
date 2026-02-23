import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Departments from './pages/Departments';
import Meetings from './pages/Meetings';
import Fundraising from './pages/Fundraising';
import AdminDashboard from './pages/AdminDashboard';
import DepartmentDashboard from './pages/DepartmentDashboard';
import Volunteers from './pages/Volunteers';
import Announcements from './pages/Announcements';
import PrayerRequests from './pages/PrayerRequests';
import Assets from './pages/Assets';
import StrategyBoard from './pages/StrategyBoard';
import Events from './pages/Events';
import Settings from './pages/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!token) return <Navigate to="/login" />;

    return <>{children}</>;
}

function RootRedirect() {
    const { user } = useAuth();
    if (user?.role === 'SUPER_ADMIN') return <AdminDashboard />;
    return <Navigate to={`/department/${user?.departmentId}`} replace />;
}

function DepartmentGuard({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    if (user?.role === 'SUPER_ADMIN') return <>{children}</>;
    return <Navigate to="/" replace />;
}

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/departments" element={
                <PrivateRoute>
                    <DepartmentGuard><Departments /></DepartmentGuard>
                </PrivateRoute>
            } />
            <Route path="/meetings" element={<PrivateRoute><Meetings /></PrivateRoute>} />
            <Route path="/fundraising" element={<PrivateRoute><Fundraising /></PrivateRoute>} />
            <Route path="/volunteers" element={<PrivateRoute><Volunteers /></PrivateRoute>} />
            <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
            <Route path="/prayer-requests" element={<PrivateRoute><PrayerRequests /></PrivateRoute>} />
            <Route path="/assets" element={<PrivateRoute><Assets /></PrivateRoute>} />
            <Route path="/strategy" element={<PrivateRoute><StrategyBoard /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/department/:id" element={<PrivateRoute><DepartmentDashboard /></PrivateRoute>} />
            <Route path="/" element={<PrivateRoute><RootRedirect /></PrivateRoute>} />
        </Routes>
    );
}

export default App;
