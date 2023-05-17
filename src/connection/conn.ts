import mongoose from 'mongoose';

export async function mongodbConection() {
  try {
    const uri: string = process.env.DB_URI_CONNECTION || '';
    mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}
