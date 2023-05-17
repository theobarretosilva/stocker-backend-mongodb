import { Request, Response } from 'express';
import CompanySchema from './model/CompanySchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
      request.body.confirm_password = '';

      const newCompany = await CompanySchema.create(request.body);
      newCompany.password = '';
      return response.status(201).json(newCompany);
    } catch (error) {
      return response.status(500).json({
        error: 'There was an error, try again later',
      });
    }
  }

  async login(request: Request, response: Response) {
    try {
      const company = await CompanySchema.findOne({ email: request.body.email })
      if (!company) {
        return response.status(401).json({
          error: 'Email or password are incorrect'
        })
      }

      const result = await bcrypt.compare(request.body.password, company.password)
      if (result) {
        const { SECRET = 'secret' } = process.env
        const token = jwt.sign({ email: company.email, responsible: company.responsible, company_name: company.company_name, _id: company._id}, SECRET)
        company.password = ''
        return response.json({ token, company })
      }

      return response.status(401).json({
        error: 'Email or password are incorrect'
      })
    } catch (error) {
      return response.status(500).json({
        error: 'Failed to login!'
      })
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
