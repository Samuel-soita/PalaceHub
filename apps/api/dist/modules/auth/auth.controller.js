import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../utils/prisma.js';
export const register = async (req, res) => {
    const { email, password, name, role, departmentId } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role || 'DEPARTMENT_LEADER',
                departmentId,
            },
        });
        const token = jwt.sign({ id: user.id, role: user.role, departmentId: user.departmentId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.status(201).json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Registration failed' });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        if (user.role === 'MEMBER') {
            return res.status(403).json({ error: 'Access denied. Only leaders can log in.' });
        }
        const token = jwt.sign({ id: user.id, role: user.role, departmentId: user.departmentId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, token });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
export const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, name: true, role: true, departmentId: true }
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};
