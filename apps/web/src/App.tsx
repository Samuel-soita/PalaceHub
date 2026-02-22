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
import Strategy from './pages/Strategy';
import Settings from './pages/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!token) return <Navigate to="/login" />;

    return <>{children}</>;
}

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/departments" element={<PrivateRoute><Departments /></PrivateRoute>} />
            <Route path="/meetings" element={<PrivateRoute><Meetings /></PrivateRoute>} />
            <Route path="/fundraising" element={<PrivateRoute><Fundraising /></PrivateRoute>} />
            <Route path="/volunteers" element={<PrivateRoute><Volunteers /></PrivateRoute>} />
            <Route path="/announcements" element={<PrivateRoute><Announcements /></PrivateRoute>} />
            <Route path="/prayer-requests" element={<PrivateRoute><PrayerRequests /></PrivateRoute>} />
            <Route path="/assets" element={<PrivateRoute><Assets /></PrivateRoute>} />
            <Route path="/strategy" element={<PrivateRoute><Strategy /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/department/:id" element={<PrivateRoute><DepartmentDashboard /></PrivateRoute>} />
            <Route path="/" element={
                <PrivateRoute>
                    <AdminDashboard />
                </PrivateRoute>
            } />
        </Routes>
    );
}

export default App;
