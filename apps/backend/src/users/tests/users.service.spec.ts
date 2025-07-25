/* eslint-disable @typescript-eslint/unbound-method */
import { UsersService } from '../services/users.service';
import { PrismaService } from '../../prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: Partial<PrismaService>;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    prisma = {
      user: {
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    } as any;
    service = new UsersService(prisma as PrismaService);
  });

  it('should get user by id', async () => {
    (prisma.user!.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
    const result = await service.getMe(1);
    expect(result).toEqual({ id: 1 });
    expect(prisma.user!.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw if user not found', async () => {
    (prisma.user!.findUnique as jest.Mock).mockResolvedValue(null);
    await expect(service.getMe(2)).rejects.toThrow(NotFoundException);
  });

  it('should update user (without email)', async () => {
    (prisma.user!.update as jest.Mock).mockResolvedValue({ id: 3, name: 'n' });
    const dto = { name: 'n', email: 'shouldnotupdate' };
    const result = await service.updateMe(3, dto);
    expect(result).toEqual({ id: 3, name: 'n' });
    expect(prisma.user!.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { name: 'n' },
    });
  });

  it('should delete user', async () => {
    (prisma.user!.delete as jest.Mock).mockResolvedValue({ id: 4 });
    const result = await service.deleteMe(4);
    expect(result).toEqual({ id: 4 });
    expect(prisma.user!.delete).toHaveBeenCalledWith({ where: { id: 4 } });
  });
});
