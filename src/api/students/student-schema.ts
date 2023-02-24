import mongoose, { Schema } from 'mongoose';

export const studentSchema = new Schema({
  id: String,
  name: String,
  score: Number,
  subjects: [String],
});

export const StudentModel = mongoose.model(
  'Student',
  studentSchema,
  'students',
);
