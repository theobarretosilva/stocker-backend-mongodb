import { Request, Response } from 'express';
import CompanySchema from './model/CompanySchema';
import bcrypt from 'bcrypt';

export class CompanyController {
  async signUp(request: Request, response: Response) {
    try {
      const emailAlredyExists = await CompanySchema.findOne({
        email: request.body.email,
      });

      if (emailAlredyExists) {
        return response.status(400).json({
          error: 'This e-mail is already registed!',
        });
      }

      request.body.password = await bcrypt.hash(request.body.password, 10);

      const newCompany = await CompanySchema.create(request.body);
      newCompany.password = '';
      return response.status(201).json(newCompany);
    } catch (error) {
      return response.status(500).json({
        error: 'There was an error, try again later',
      });
    }
  }
}

// import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
// import { LoginDTO } from './dto/login.dto';
// import {
//   UnauthorizedException,
//   HttpException,
// } from '@nestjs/common/exceptions';
// import { CompaniesService } from './companies.service';
// import { CompanyEntity } from './entities/company.entity';
// import { CreateCompanyDTO } from './dto/create_company.dto';

// @Controller('company')
// export class CompaniesController {
//   constructor(private readonly companiesService: CompaniesService) {}

//   @Post('/login')
//   async login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
//     if (!(await this.companiesService.findOne(loginDTO.email))) {
//       throw new UnauthorizedException(
//         'Este e-mail não consta no nosso banco de dados!',
//       );
//     }
//     return await this.companiesService.signIn(loginDTO);
//   }

//   @Post('/signup')
//   async signUp(
//     @Body() createCompanyDto: CreateCompanyDTO,
//   ): Promise<CompanyEntity> {
//     try {
//       return await this.companiesService.signUp(createCompanyDto);
//     } catch (error) {
//       if (error.code == 23505)
//         throw new HttpException(
//           { message: error.detail, errorCode: HttpStatus.CONFLICT },
//           HttpStatus.CONFLICT,
//         );

//       throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
//     }
//   }
// }