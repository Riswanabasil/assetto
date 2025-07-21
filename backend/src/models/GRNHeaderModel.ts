import mongoose, { Schema } from 'mongoose';

const grnLineItemSchema = new Schema({
  subcategoryId: { type: Schema.Types.ObjectId, ref: 'AssetSubcategory', required: true },
  itemDescription: { type: String },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  taxPercent: { type: Number, default: 0 },
  taxableValue: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
}, { _id: false }); 

const grnHeaderSchema = new Schema({
  grnNumber: { type: String, required: true, unique: true }, 
  grnDate: { type: Date, required: true },
  invoiceNumber: { type: String, required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  items: [grnLineItemSchema],
}, { timestamps: true });

export const GRNHeaderModel = mongoose.model('GRNHeader', grnHeaderSchema);
