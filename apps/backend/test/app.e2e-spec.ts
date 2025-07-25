import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Taskify E2E', () => {
  let app: INestApplication;
  let accessToken: string;
  let userId: number;
  let taskId: number;

  beforeAll(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();
    await app.close();
    await prisma.$disconnect();
  });

  it('Health check', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('Register user', async () => {
    const res = (await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'Test User', email: 'test@e2e.com', password: 'test1234' })
      .expect(201)) as { body: { accessToken: string } };
    expect(res.body.accessToken).toBeDefined();
    accessToken = res.body.accessToken;
    const user = await prisma.user.findUnique({
      where: { email: 'test@e2e.com' },
    });
    expect(user).toBeDefined();
    userId = user!.id;
  });

  it('Login user', async () => {
    const res = (await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@e2e.com', password: 'test1234' })
      .expect(201)) as { body: { accessToken: string } };
    expect(res.body.accessToken).toBeDefined();
  });

  it('Get current user (protected)', async () => {
    const res = (await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)) as { body: { email: string } };
    expect(res.body.email).toBe('test@e2e.com');
  });

  it('Fail to get user without token', async () => {
    await request(app.getHttpServer()).get('/users/me').expect(401);
  });

  it('Create task', async () => {
    const res = (await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'My first task', description: 'E2E test task' })
      .expect(201)) as { body: { title: string; status: string; id: number } };
    expect(res.body.title).toBe('My first task');
    expect(res.body.status).toBe('PENDING');
    taskId = res.body.id;
  });

  it('List tasks', async () => {
    const res = (await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)) as { body: Array<unknown> };
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('Update task', async () => {
    const res = (await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Updated title', status: 'COMPLETED' })
      .expect(200)) as { body: { title: string; status: string } };
    expect(res.body.title).toBe('Updated title');
    expect(res.body.status).toBe('COMPLETED');
  });

  it('Delete task', async () => {
    await request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    const tasks = await prisma.task.findMany({ where: { userId } });
    expect(tasks.length).toBe(0);
  });

  it('Fail to create task without title (validation)', async () => {
    await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ description: 'No title' })
      .expect(400);
  });

  it('Fail to access tasks without token', async () => {
    await request(app.getHttpServer()).get('/tasks').expect(401);
  });

  it('Update user name', async () => {
    const res = (await request(app.getHttpServer())
      .patch('/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'New Name' })
      .expect(200)) as { body: { name: string } };
    expect(res.body.name).toBe('New Name');
  });

  it('Delete user', async () => {
    await request(app.getHttpServer())
      .delete('/users/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    expect(user).toBeNull();
  });
});
