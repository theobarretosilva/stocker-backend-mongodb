import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface Company extends mongoose.Document {
  _id: number;
  company_name: string;
  cnpj: string;
  responsible: string;
  email: string;
  phone: string;
  photo_url: string;
  salt: string;
  password: string;
  confirm_password: string;
}

const Schema = new mongoose.Schema<Company>(
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
    salt: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true },
);

Schema.methods.checkPassword = async function (password: string): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
}

export default mongoose.model<Company>('Companies', Schema);
