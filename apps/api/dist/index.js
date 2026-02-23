import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes.js';
import departmentRoutes from './modules/departments/departments.routes.js';
import meetingRoutes from './modules/meetings/meetings.routes.js';
import budgetRoutes from './modules/budgets/budgets.routes.js';
import contributorRoutes from './modules/contributors/contributors.routes.js';
import volunteerRoutes from './modules/volunteers/volunteers.routes.js';
import announcementRoutes from './modules/announcements/announcements.routes.js';
import prayerRequestRoutes from './modules/prayer-requests/prayer-requests.routes.js';
import assetRoutes from './modules/assets/assets.routes.js';
import strategyRoutes from './modules/strategy/strategy.routes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
// Routes
app.use('/auth', authRoutes);
app.use('/departments', departmentRoutes);
app.use('/meetings', meetingRoutes);
app.use('/budgets', budgetRoutes);
app.use('/contributors', contributorRoutes);
app.use('/volunteers', volunteerRoutes);
app.use('/announcements', announcementRoutes);
app.use('/prayer-requests', prayerRequestRoutes);
app.use('/assets', assetRoutes);
app.use('/strategy', strategyRoutes);
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
    console.log(`[server]: CDMS API is running at http://localhost:${port}`);
});
