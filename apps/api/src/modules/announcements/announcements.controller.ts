import { Request, Response } from 'express';
import prisma from '../../utils/prisma.js';
import { AuthRequest } from '../../middleware/auth.middleware.js';

export const getAnnouncements = async (req: Request, res: Response) => {
    try {
        const announcements = await prisma.announcement.findMany({
            include: { author: { select: { id: true, name: true, email: true } }, department: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(announcements);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch announcements' });
    }
};

export const createAnnouncement = async (req: AuthRequest, res: Response) => {
    const { title, content, priority, expiry, departmentId } = req.body;
    try {
        const announcement = await prisma.announcement.create({
            data: {
                title,
                content,
                priority,
                expiry: expiry ? new Date(expiry) : null,
                authorId: req.user!.id,
                departmentId,
            },
        });
        res.status(201).json(announcement);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to create announcement' });
    }
};

export const updateAnnouncement = async (req: Request, res: Response) => {
    try {
        const announcement = await prisma.announcement.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(announcement);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to update announcement' });
    }
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
    try {
        await prisma.announcement.delete({ where: { id: req.params.id } });
        res.json({ message: 'Announcement deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to delete announcement' });
    }
};
