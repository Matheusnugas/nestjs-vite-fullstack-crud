import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { TasksService } from '../services/tasks.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { AppLogger } from '../../common/utils/logger';
import { Request } from 'express';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'List all tasks for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of tasks.' })
  async findAll(@CurrentUser() user: User, @Req() req: Request) {
    AppLogger.info(req, `START: User ${user.id} requested all tasks`);
    const result = await this.tasksService.findAll(user.id);
    AppLogger.info(req, `END: User ${user.id} requested all tasks`);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task for the authenticated user' })
  @ApiResponse({ status: 201, description: 'Task created.' })
  async create(
    @Body() dto: CreateTaskDto,
    @CurrentUser() user: User,
    @Req() req: Request,
  ) {
    AppLogger.info(req, `START: User ${user.id} creating a task`);
    const result = await this.tasksService.create(dto, user.id);
    AppLogger.info(req, `END: User ${user.id} created a task`);
    return result;
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a task (title/status) for the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'Task updated.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: User,
    @Req() req: Request,
  ) {
    AppLogger.info(req, `START: User ${user.id} updating task ${id}`);
    const result = await this.tasksService.update(id, dto, user.id);
    AppLogger.info(req, `END: User ${user.id} updated task ${id}`);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task for the authenticated user' })
  @ApiResponse({ status: 200, description: 'Task deleted.' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Req() req: Request,
  ) {
    AppLogger.info(req, `START: User ${user.id} deleting task ${id}`);
    const result = await this.tasksService.remove(id, user.id);
    AppLogger.info(req, `END: User ${user.id} deleted task ${id}`);
    return result;
  }
}
