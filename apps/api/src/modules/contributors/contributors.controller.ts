import { Request, Response } from 'express';
import prisma from '../../utils/prisma.js';

export const createContributor = async (req: Request, res: Response) => {
    const { name, amount, paymentMethod, budgetId, departmentId, anonymousFlag, notes } = req.body;

    try {
        const contributor = await prisma.$transaction(async (tx: any) => {
            const contr = await tx.contributor.create({
                data: {
                    name,
                    amount,
                    paymentMethod,
                    budgetId,
                    departmentId,
                    anonymousFlag: anonymousFlag || false,
                    notes,
                },
            });

            await tx.budget.update({
                where: { id: budgetId },
                data: { amountRaised: { increment: amount } },
            });

            return contr;
        });

        res.status(201).json(contributor);
    } catch (error: any) {
        res.status(400).json({ error: error.message || 'Failed to add contributor' });
    }
};

export const getContributors = async (req: Request, res: Response) => {
    const { budgetId, departmentId } = req.query;
    try {
        const contributors = await prisma.contributor.findMany({
            where: {
                AND: [
                    budgetId ? { budgetId: String(budgetId) } : {},
                    departmentId ? { departmentId: String(departmentId) } : {}
                ]
            },
            orderBy: { date: 'desc' },
            include: { budget: { select: { title: true } } }
        });
        res.json(contributors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contributors' });
    }
};
