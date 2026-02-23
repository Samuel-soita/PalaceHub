import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Starting emergency seed...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@palacehub.com' },
        update: { password: hashedPassword },
        create: {
            email: 'admin@palacehub.com',
            password: hashedPassword,
            name: 'Global Commander',
            role: 'SUPER_ADMIN'
        }
    });

    const departments = await prisma.department.findMany();
    for (const dept of departments) {
        const slug = dept.name.toLowerCase().replace(/ & /g, '.').replace(/ /g, '.');
        const email = `${slug}@palacehub.com`;

        await prisma.user.upsert({
            where: { email },
            update: { departmentId: dept.id },
            create: {
                email,
                password: hashedPassword,
                name: `Commander ${dept.name}`,
                role: 'DEPARTMENT_LEADER',
                departmentId: dept.id
            }
        });
        console.log(`👤 Leader Ready: ${email}`);
    }

    console.log('🏁 Universal Sector Protocol Activated.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
