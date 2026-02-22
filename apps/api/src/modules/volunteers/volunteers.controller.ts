import { Request, Response } from 'express';
import prisma from '../../utils/prisma.js';

export const getVolunteers = async (req: Request, res: Response) => {
    try {
        const volunteers = await prisma.volunteer.findMany({
            include: { department: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(volunteers);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch volunteers' });
    }
};

export const getVolunteersByDepartment = async (req: Request, res: Response) => {
    try {
        const volunteers = await prisma.volunteer.findMany({
            where: { departmentId: req.params.departmentId },
            include: { department: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(volunteers);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch volunteers' });
    }
};

export const createVolunteer = async (req: Request, res: Response) => {
    const { name, email, skills, availability, departmentId, status } = req.body;
    try {
        const volunteer = await prisma.volunteer.create({
            data: { name, email, skills, availability, departmentId, status },
        });
        res.status(201).json(volunteer);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to create volunteer' });
    }
};

export const updateVolunteer = async (req: Request, res: Response) => {
    try {
        const volunteer = await prisma.volunteer.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(volunteer);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to update volunteer' });
    }
};

export const deleteVolunteer = async (req: Request, res: Response) => {
    try {
        await prisma.volunteer.delete({ where: { id: req.params.id } });
        res.json({ message: 'Volunteer removed successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to delete volunteer' });
    }
};
