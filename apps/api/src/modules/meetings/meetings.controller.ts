import { Request, Response } from 'express';
import prisma from '../../utils/prisma.js';

export const createMeeting = async (req: any, res: Response) => {
    const {
        title, departmentId, date, time, venue, meetingType,
        agenda, followUpPersonId, followUpDeadline
    } = req.body;

    try {
        const meeting = await prisma.meeting.create({
            data: {
                title,
                departmentId,
                date: new Date(date),
                time,
                venue,
                meetingType,
                agenda,
                organizerId: req.user.id,
                followUpPersonId,
                followUpDeadline: followUpDeadline ? new Date(followUpDeadline) : null,
            },
        });
        res.status(201).json(meeting);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to create meeting' });
    }
};

export const getMeetings = async (req: Request, res: Response) => {
    const { departmentId } = req.query;
    try {
        const meetings = await prisma.meeting.findMany({
            where: departmentId ? { departmentId: String(departmentId) } : {},
            include: {
                organizer: { select: { name: true } },
                followUpPerson: { select: { name: true } },
                department: { select: { name: true } }
            },
            orderBy: { date: 'desc' }
        });
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meetings' });
    }
};

export const updateMeeting = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    if (data.date) data.date = new Date(data.date);
    if (data.followUpDeadline) data.followUpDeadline = new Date(data.followUpDeadline);

    try {
        const meeting = await prisma.meeting.update({
            where: { id },
            data,
        });
        res.json(meeting);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update meeting' });
    }
};
