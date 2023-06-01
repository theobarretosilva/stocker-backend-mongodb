import { CompanyController } from "../companies/companies.controller";

export const Routes = [
  {
    method: 'post',
    route: '/signup',
    controller: CompanyController,
    action: 'signUp',
  },
  {
    method: 'post',
    route: '/login',
    controller: CompanyController,
    action: 'login'
  },
  {
    method: 'post',
    route: '/findEmail',
    controller: CompanyController,
    action: 'findEmail'
  },
  {
    method: 'put',
    route: '/changePassword',
    controller: CompanyController,
    action: 'changePassword'
  }
];
