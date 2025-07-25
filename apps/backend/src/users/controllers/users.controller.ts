import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dtos/user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../entities/user.entity';
import { AppLogger } from '../../common/utils/logger';
import { Request } from 'express';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({ status: 200, description: 'Current user data.' })
  async getMe(@CurrentUser() user: User, @Req() req: Request): Promise<User> {
    AppLogger.info(req, `START: User ${user.id} requested own data`);
    const result = await this.usersService.getMe(user.id);
    AppLogger.info(req, `END: User ${user.id} requested own data`);
    return result;
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current authenticated user' })
  @ApiResponse({ status: 200, description: 'User updated.' })
  async updateMe(
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: User,
    @Req() req: Request,
  ): Promise<User> {
    AppLogger.info(req, `START: User ${user.id} updating own data`);
    const result = await this.usersService.updateMe(user.id, dto);
    AppLogger.info(req, `END: User ${user.id} updated own data`);
    return result;
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete current authenticated user' })
  @ApiResponse({ status: 200, description: 'User deleted.' })
  async deleteMe(
    @CurrentUser() user: User,
    @Req() req: Request,
  ): Promise<User> {
    AppLogger.info(req, `START: User ${user.id} deleting own account`);
    const result = await this.usersService.deleteMe(user.id);
    AppLogger.info(req, `END: User ${user.id} deleted own account`);
    return result;
  }
}
