import mongoose, { Schema } from 'mongoose';

const assetSubcategorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'AssetCategory', required: true },
}, { timestamps: true });

export const AssetSubcategoryModel = mongoose.model('AssetSubcategory', assetSubcategorySchema);
