import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateMe(userId: number, dto: UpdateUserDto) {
    const safeDto = { ...dto };
    delete (safeDto as Record<string, unknown>).email;
    return this.prisma.user.update({ where: { id: userId }, data: safeDto });
  }

  async deleteMe(userId: number) {
    return this.prisma.user.delete({ where: { id: userId } });
  }
}
