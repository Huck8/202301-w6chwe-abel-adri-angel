import mongoose from 'mongoose';
// Mongoose.set('strictQuery', true);
const connectDB = (urlBD: string) =>
  new Promise((resolve, reject) => {
    mongoose.connect(urlBD, error => {
      if (error) {
        reject(error);
      }

      resolve(true);
    });
  });

export default connectDB;
