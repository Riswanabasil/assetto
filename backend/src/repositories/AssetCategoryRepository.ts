import { AssetCategoryModel } from '../models/AssetCategoryModel';
import type { IAssetCategory } from '../types/AssetCategory';  
import type { Types } from 'mongoose';

export class AssetCategoryRepository {
  async create(data: IAssetCategory) {
    return await AssetCategoryModel.create(data);
  }

  async findAll(): Promise<IAssetCategory[]> {
    return await AssetCategoryModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string | Types.ObjectId): Promise<IAssetCategory | null> {
    return await AssetCategoryModel.findById(id);
  }

  async update(id: string | Types.ObjectId, data: Partial<IAssetCategory>) {
    return await AssetCategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string | Types.ObjectId) {
    return await AssetCategoryModel.findByIdAndDelete(id);
  }
}
