import mongoose, { Schema } from 'mongoose';

const manufacturerSchema = new Schema({
  name: { type: String, required: true },
  description: String
}, { timestamps: true });

export const ManufacturerModel = mongoose.model('Manufacturer', manufacturerSchema);
