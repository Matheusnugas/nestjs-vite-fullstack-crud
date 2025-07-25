import {
  IsInt,
  IsEmail,
  IsString,
  IsDate,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsDate()
  createdAt: Date;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'New Name', description: 'New user name' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({
    example: 'newpassword123',
    description: 'New user password (min 6 characters)',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
