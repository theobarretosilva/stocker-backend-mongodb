import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'Email is a required field to login!' })
  @IsString({ message: 'Email must be a string!' })
  @IsEmail(undefined, { message: 'The email entered is not valid!' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is a required field to login!' })
  @IsString({ message: 'Password must be a string!' })
  @MinLength(8, { message: 'Password must be at least 8 characters!' })
  readonly password: string;
}
