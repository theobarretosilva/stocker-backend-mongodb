import { CompanyController } from "../companies/companies.controller";

export const Routes = [
  {
    method: 'post',
    route: '/signup',
    controller: CompanyController,
    action: 'signUp',
  },
];
