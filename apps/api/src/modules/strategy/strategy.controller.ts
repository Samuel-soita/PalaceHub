import { Request, Response } from 'express';
import prisma from '../../utils/prisma.js';

export const getStrategies = async (req: Request, res: Response) => {
    try {
        const strategies = await prisma.strategy.findMany({
            include: { department: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(strategies);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch strategies' });
    }
};

export const getStrategiesByDepartment = async (req: Request, res: Response) => {
    try {
        const strategies = await prisma.strategy.findMany({
            where: { departmentId: req.params.departmentId },
            include: { department: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json(strategies);
    } catch (error: any) {
        res.status(500).json({ error: error.message || 'Failed to fetch strategies' });
    }
};

export const createStrategy = async (req: Request, res: Response) => {
    const { title, actionItems, assignedPerson, deadline, status, departmentId } = req.body;
    try {
        const strategy = await prisma.strategy.create({
            data: {
                title,
                actionItems,
                assignedPerson,
                deadline: deadline ? new Date(deadline) : null,
                status,
                departmentId,
            },
        });
        res.status(201).json(strategy);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to create strategy' });
    }
};

export const updateStrategy = async (req: Request, res: Response) => {
    try {
        const strategy = await prisma.strategy.update({
            where: { id: req.params.id },
            data: req.body,
        });
        res.json(strategy);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to update strategy' });
    }
};

export const deleteStrategy = async (req: Request, res: Response) => {
    try {
        await prisma.strategy.delete({ where: { id: req.params.id } });
        res.json({ message: 'Strategy deleted successfully' });
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to delete strategy' });
    }
};
