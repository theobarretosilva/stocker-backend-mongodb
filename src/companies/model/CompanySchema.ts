import mongoose from 'mongoose';

export interface Company {
  _id: number;
  company_name: string;
  cnpj: string;
  responsible: string;
  email: string;
  phone: string;
  photo_url: string;
  salt: string;
  password: string;
}

const Schema = new mongoose.Schema(
  {
    company_name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    cnpj: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    responsible: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    phone: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    photo_url: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    confirm_password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<Company>('Companies', Schema);
