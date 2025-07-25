import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'New title', description: 'New task title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: TaskStatus.COMPLETED,
    description: 'New task status',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    example: 'New description',
    description: 'New task description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
