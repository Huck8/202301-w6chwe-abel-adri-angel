import mongoose, { Schema } from 'mongoose';

export const robotSchema = new Schema({
  id: String,
  name: String,
  imageUrl: String,
  velocity: Number,
  resistance: Number,
  creationDate: Date,
  faction: String,
});

export const RobotModel = mongoose.model('transformer', robotSchema, 'robots');
