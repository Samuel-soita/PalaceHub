import prisma from '../../utils/prisma.js';
export const createBudget = async (req, res) => {
    const { title, targetAmount, deadline, departmentId, linkedEventId } = req.body;
    try {
        const budget = await prisma.budget.create({
            data: {
                title,
                targetAmount,
                deadline: new Date(deadline),
                departmentId,
                linkedEventId,
            },
        });
        res.status(201).json(budget);
    }
    catch (error) {
        res.status(400).json({ error: error.message || 'Failed to create budget' });
    }
};
export const getBudgets = async (req, res) => {
    const { departmentId } = req.query;
    try {
        const budgets = await prisma.budget.findMany({
            where: departmentId ? { departmentId: String(departmentId) } : {},
            include: {
                department: { select: { name: true } },
                contributors: true,
                _count: { select: { contributors: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(budgets);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch budgets' });
    }
};
