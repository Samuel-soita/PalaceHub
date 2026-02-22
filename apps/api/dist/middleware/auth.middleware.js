import jwt from 'jsonwebtoken';
export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
export const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};
export const departmentGuard = (req, res, next) => {
    const { departmentId } = req.params;
    if (!req.user)
        return res.status(401).json({ error: 'Unauthorized' });
    if (req.user.role === 'SUPER_ADMIN')
        return next();
    if (req.user.role === 'DEPARTMENT_LEADER' && req.user.departmentId === departmentId) {
        return next();
    }
    res.status(403).json({ error: 'Access denied to this department' });
};
