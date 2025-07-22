import mongoose, { Schema } from 'mongoose';

const branchSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  code: { type: String },
}, { timestamps: true });

export const BranchModel = mongoose.model('Branch', branchSchema);
