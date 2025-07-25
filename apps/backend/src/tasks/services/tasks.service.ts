import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TaskPolicy } from '../../common/policies/task.policy';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async create(dto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        userId,
      },
    });
  }

  async update(id: number, dto: UpdateTaskDto, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    TaskPolicy.assertOwnership(task.userId, userId);
    return this.prisma.task.update({ where: { id }, data: dto });
  }

  async remove(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    TaskPolicy.assertOwnership(task.userId, userId);
    return this.prisma.task.delete({ where: { id } });
  }
}
