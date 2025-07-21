import mongoose, { Schema } from 'mongoose';

const vendorSchema = new Schema({
  name: { type: String, required: true },
  contactPerson: String,
  email: String,
  phone: String,
  address: String,
  gstNumber: String,
}, { timestamps: true });

export const VendorModel = mongoose.model('Vendor', vendorSchema);
