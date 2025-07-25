import { IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'New task', description: 'Task title' })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiPropertyOptional({
    example: 'Detailed description',
    description: 'Optional task description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
