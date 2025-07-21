import mongoose, { Schema } from 'mongoose';

const assetCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export const AssetCategoryModel = mongoose.model('AssetCategory', assetCategorySchema);
