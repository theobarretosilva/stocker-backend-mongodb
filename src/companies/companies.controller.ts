import { Request, Response } from 'express';
import CompanySchema from './model/CompanySchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { sendEmail } from '../api/emailSender';

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
        type: error,
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

  async findEmail(request: Request, response: Response) {
    try {
      const company = await CompanySchema.find({ email: request.body.email })
      if (!company) {
        return response.status(400).json({
          error: 'Email not found'
        })
      }
      console.log(request.body.data.email)
      const sendCodeEmail = await sendEmail(request.body.data.email);
      
      return response.status(200).json({
        message: 'Email found, redirecting you to password change!',
        code: 200,
        resetPasswordCode: sendCodeEmail
      })
    } catch (error) {
      return response.status(500).json({
        error: 'Failed to get user!',
      })
    }
  }

  async changePassword(request: Request, response: Response) {
    try {
      const { password, confirm_passowrd, email } = request.body;

      const foundCompany = await CompanySchema.findOne({
        where: {
          email: email,
        },
      });

      if (!foundCompany) {
        response.status(404).json({
          error: 'Company not found',
        })
      } else {
        if (password == confirm_passowrd) {
          const hashPassword = await bcrypt.hash(password, foundCompany.salt);

          foundCompany.password = hashPassword;
          await foundCompany.save();
          
          return response.status(200).json({
            message: 'Password changed successfully',
          });
        } else {
          return response.status(401).json({
            error: 'The password confirmation or the password is incorrect',
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        error: 'Failed to change password',
      });
    }
  }
}
