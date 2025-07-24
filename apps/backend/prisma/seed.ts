import { PrismaClient, Prisma } from '@prisma/client';
type User = Prisma.UserGetPayload<{}>;

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Creating test user...');

  const user: User = await prisma.user.create({
    data: {
      name: 'El Matheus',
      email: 'matheus@example.com',
      password: 'hashed-password-aqui',
    },
  });

  console.log('✅ User created:', user);

  console.log('🔄 Creating tasks...');
  await prisma.task.createMany({
    data: [
      {
        title: 'Create frontend layout',
        description: 'Build the base structure using Vite + React',
        status: 'PENDING',
        userId: user.id,
      },
      {
        title: 'Implement authentication',
        description: 'Login and registration with JWT',
        status: 'COMPLETED',
        userId: user.id,
      },
    ],
  });

  console.log('✅ Tasks created successfully');
}

main()
  .then(() => {
    console.log('🌱 Seed completed');
  })
  .catch((e) => {
    console.error('❌ Error while seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
