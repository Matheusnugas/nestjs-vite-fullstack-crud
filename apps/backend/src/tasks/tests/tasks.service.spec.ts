/* eslint-disable @typescript-eslint/unbound-method */
import { TasksService } from '../services/tasks.service';
import { PrismaService } from '../../prisma.service';
import { TaskPolicy } from '../../common/policies/task.policy';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: Partial<PrismaService>;

  beforeEach(() => {
    prisma = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      task: {
        findMany: jest.fn(),
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      } as any,
    };
    service = new TasksService(prisma as PrismaService);
  });

  it('should find all tasks for user', async () => {
    (prisma.task!.findMany as jest.Mock).mockResolvedValue([{ id: 1 }]);
    const result = await service.findAll(1);
    expect(result).toEqual([{ id: 1 }]);
    expect(prisma.task!.findMany).toHaveBeenCalledWith({
      where: { userId: 1 },
    });
  });

  it('should create a task', async () => {
    (prisma.task!.create as jest.Mock).mockResolvedValue({ id: 2 });
    const dto = { title: 't', description: 'd' };
    const result = await service.create(dto, 1);
    expect(result).toEqual({ id: 2 });
    expect(prisma.task!.create).toHaveBeenCalledWith({
      data: { ...dto, userId: 1 },
    });
  });

  it('should update a task if owner', async () => {
    (prisma.task!.findUnique as jest.Mock).mockResolvedValue({
      id: 3,
      userId: 1,
    });
    jest.spyOn(TaskPolicy, 'assertOwnership').mockImplementation(() => {});
    (prisma.task!.update as jest.Mock).mockResolvedValue({
      id: 3,
      title: 'new',
    });
    const result = await service.update(3, { title: 'new' }, 1);
    expect(result).toEqual({ id: 3, title: 'new' });
    expect(TaskPolicy.assertOwnership).toHaveBeenCalledWith(1, 1);
  });

  it('should throw if task not found on update', async () => {
    (prisma.task!.findUnique as jest.Mock).mockResolvedValue(null);
    await expect(service.update(4, { title: 'x' }, 1)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should remove a task if owner', async () => {
    (prisma.task!.findUnique as jest.Mock).mockResolvedValue({
      id: 5,
      userId: 2,
    });
    jest.spyOn(TaskPolicy, 'assertOwnership').mockImplementation(() => {});
    (prisma.task!.delete as jest.Mock).mockResolvedValue({ id: 5 });
    const result = await service.remove(5, 2);
    expect(result).toEqual({ id: 5 });
    expect(TaskPolicy.assertOwnership).toHaveBeenCalledWith(2, 2);
  });

  it('should throw if task not found on remove', async () => {
    (prisma.task!.findUnique as jest.Mock).mockResolvedValue(null);
    await expect(service.remove(6, 1)).rejects.toThrow(NotFoundException);
  });
});
