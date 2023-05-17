import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { Match } from 'src/core/constraints/match.decorator';
import { cnpj, phone } from 'src/utils/validations';

export class CreateCompanyDTO {
  @IsNotEmpty({ message: 'Company name is a required field!' })
  @IsString({ message: 'Company name must be a string!' })
  readonly company_name: string;

  @IsNotEmpty({ message: 'CNPJ is a required field!' })
  @IsString({ message: 'CNPJ must be a string!' })
  @Matches(cnpj, {
    message: 'CNPJ must follow this model: XX.XXX.XXX/XXXX-XX',
  })
  readonly cnpj: string;

  @IsNotEmpty({ message: 'Responsible is a required field!' })
  @IsString({ message: 'Responsible must be a string!' })
  readonly responsible: string;

  @IsNotEmpty({ message: 'Email is a required field!' })
  @IsString({ message: 'Email must be a string!' })
  @IsEmail(undefined, { message: 'The email entered is not valid!' })
  readonly email: string;

  @IsNotEmpty({ message: 'Phone is a required field!' })
  @IsString({ message: 'Phone must be a string!' })
  @Matches(phone, {
    message: 'Phone must follow this model: (XX) XXXXX-XXXX',
  })
  readonly phone: string;

  @IsNotEmpty({ message: 'Photo url is a required field!' })
  @IsString({ message: 'Photo url must be a string!' })
  @IsUrl(undefined, { message: 'The photo url entered is not valid!' })
  readonly photo_url: string;

  @IsNotEmpty({ message: 'Password is a required field!' })
  @IsString({ message: 'Password must be a string!' })
  @MinLength(8, { message: 'Password must be at least 8 characters!' })
  readonly password: string;

  @IsNotEmpty({ message: 'Password confirmation is a required field!' })
  @IsString({ message: 'Password confirmation must be a string!' })
  @MinLength(8, {
    message: 'Password confirmation must be at least 8 characters!',
  })
  @Match('password', {
    message: 'Password confirmation does not match to the entered password',
  })
  readonly confirm_password: string;
}
