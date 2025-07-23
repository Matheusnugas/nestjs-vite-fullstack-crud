import { IsInt, IsEmail, IsString, IsDate } from 'class-validator';

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
