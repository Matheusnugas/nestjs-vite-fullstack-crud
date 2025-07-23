import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
