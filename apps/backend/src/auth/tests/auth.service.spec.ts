import { AuthService } from '../services/auth.service';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../services/password.service';
import { UnauthorizedException, ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: Partial<PrismaService>;
  let jwt: Partial<JwtService>;
  let password: Partial<PasswordService>;

  beforeEach(() => {
    prisma = new PrismaService();
    jwt = { sign: jest.fn() };
    password = {
      compare: jest.fn(),
      hash: jest.fn(),
    };
    authService = new AuthService(
      prisma as PrismaService,
      jwt as JwtService,
      password as PasswordService,
    );
  });

  describe('login', () => {
    it('should throw if user not found', async () => {
      jest.spyOn(prisma.user!, 'findUnique').mockResolvedValue(null);
      await expect(
        authService.login({ email: 'a@a.com', password: '123456' }),
      ).rejects.toThrow(UnauthorizedException);
    });
    it('should throw if password invalid', async () => {
      jest
        .spyOn(prisma.user!, 'findUnique')
        .mockResolvedValue({ email: 'a@a.com', password: 'hash' } as any);
      (password.compare as jest.Mock).mockResolvedValue(false);
      await expect(
        authService.login({ email: 'a@a.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
    it('should return accessToken if credentials valid', async () => {
      jest.spyOn(prisma.user!, 'findUnique').mockResolvedValue({
        id: 1,
        email: 'a@a.com',
        password: 'hash',
      } as any);
      (password.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');
      const result = await authService.login({
        email: 'a@a.com',
        password: '123456',
      });
      expect(result.accessToken).toBe('token');
    });
  });

  describe('register', () => {
    it('should throw if email already in use', async () => {
      jest
        .spyOn(prisma.user!, 'findUnique')
        .mockResolvedValue({ id: 1, email: 'a@a.com' } as any);
      await expect(
        authService.register({
          name: 'A',
          email: 'a@a.com',
          password: '123456',
        }),
      ).rejects.toThrow(ConflictException);
    });
    it('should create user and return accessToken', async () => {
      jest.spyOn(prisma.user!, 'findUnique').mockResolvedValue(null);
      (password.hash as jest.Mock).mockResolvedValue('hashed');
      jest
        .spyOn(prisma.user!, 'create')
        .mockResolvedValue({ id: 2, email: 'b@b.com' } as any);
      (jwt.sign as jest.Mock).mockReturnValue('token2');
      const result = await authService.register({
        name: 'B',
        email: 'b@b.com',
        password: '123456',
      });
      expect(result.accessToken).toBe('token2');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(prisma.user!.create as any).toHaveBeenCalledWith({
        data: { name: 'B', email: 'b@b.com', password: 'hashed' },
      });
    });
  });
});
