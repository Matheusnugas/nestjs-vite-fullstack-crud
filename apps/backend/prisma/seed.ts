import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Cria um usuário com senha hash
  const password = await bcrypt.hash('123456', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Usuário Exemplo',
      email: 'user@example.com',
      password,
      tasks: {
        create: [
          {
            title: 'Primeira tarefa',
            description: 'Esta é a primeira tarefa seed',
            status: 'PENDING',
          },
          {
            title: 'Tarefa concluída',
            description: 'Esta tarefa já está concluída',
            status: 'COMPLETED',
          },
        ],
      },
    },
  });

  console.log('Seed concluído. Usuário criado:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
