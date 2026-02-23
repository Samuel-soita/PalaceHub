import { Request, Response } from 'express';
import prisma from '../../utils/prisma.js';

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            include: { department: true },
            orderBy: { date: 'asc' },
        });
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch events' });
    }
};

export const getEventsByDepartment = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            where: { departmentId: req.params.departmentId },
            include: { department: true },
            orderBy: { date: 'asc' },
        });
        res.json(events);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch events' });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    const { title, date, time, location, departmentId, budgetNeeded, volunteersNeeded, status } = req.body;
    try {
        const event = await prisma.event.create({
            data: {
                title,
                date: new Date(date),
                time,
                location,
                departmentId,
                budgetNeeded: Number(budgetNeeded) || 0,
                volunteersNeeded: Number(volunteersNeeded) || 0,
                status: status || 'PLANNED',
            },
        });
        res.status(201).json(event);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to create event' });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { date, budgetNeeded, volunteersNeeded, ...rest } = req.body;
        const event = await prisma.event.update({
            where: { id: req.params.id },
            data: {
                ...rest,
                ...(date && { date: new Date(date) }),
                ...(budgetNeeded !== undefined && { budgetNeeded: Number(budgetNeeded) }),
                ...(volunteersNeeded !== undefined && { volunteersNeeded: Number(volunteersNeeded) }),
            },
        });
        res.json(event);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to update event' });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        await prisma.event.delete({ where: { id: req.params.id } });
        res.json({ message: 'Event deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to delete event' });
    }
};
