// import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { CompanyEntity } from './entities/company.entity';
// import { LoginDTO } from './dto/login.dto';
// import { AuthService } from 'src/core/auth/service/auth.service';
// import { JwtService } from '@nestjs/jwt';
// import { CreateCompanyDTO } from './dto/create_company.dto';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class CompaniesService {
//   constructor(
//     @Inject('COMPANIES_REPOSITORY')
//     private companyRepository: Repository<CompanyEntity>,
//     private authService: AuthService,
//     private jwtService: JwtService,
//   ) {}

//   async signIn(credentials: LoginDTO) {
//     const company = await this.authService.checkCredentials(credentials);
//     if (company === null) {
//       throw new UnauthorizedException(
//         'E-mail e/ou senha incorretos! Não foi possível realizar o login',
//       );
//     }

//     const jwtPayload = {
//       id: company._id,
//       name: company.company_name,
//       email: company.email,
//     };
//     const token = this.jwtService.sign(jwtPayload);
//     return { token };
//   }

//   async findOne(email: string) {
//     const userExists = await this.companyRepository.findOne({
//       where: {
//         email: email,
//       },
//     });
//     return userExists;
//   }

//   async signUp(createCompanyDto: CreateCompanyDTO): Promise<CompanyEntity> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const {
//           company_name,
//           cnpj,
//           responsible,
//           email,
//           phone,
//           photo_url,
//           password,
//         } = createCompanyDto;

//         const createCompany = this.companyRepository.create();
//         createCompany.company_name = company_name;
//         createCompany.cnpj = cnpj;
//         createCompany.responsible = responsible;
//         createCompany.email = email;
//         createCompany.phone = phone;
//         createCompany.salt = await bcrypt.genSalt();
//         createCompany.password = await this.hashPassword(
//           password,
//           createCompany.salt,
//         );
//         createCompany.photo_url = photo_url;
//         const companyCreated = this.companyRepository.save(createCompany);
//         delete (await companyCreated).password;
//         delete createCompany.salt;
//         resolve(companyCreated);
//       } catch (error) {
//         reject({
//           code: error.code,
//           detail: error.detail,
//         });
//       }
//     });
//   }

//   private async hashPassword(password: string, salt: string): Promise<string> {
//     return bcrypt.hash(password, salt);
//   }
// }
