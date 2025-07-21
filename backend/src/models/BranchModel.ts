import mongoose, { Schema } from 'mongoose';

const branchSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  code: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export const BranchModel = mongoose.model('Branch', branchSchema);
