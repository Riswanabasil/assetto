import { AssetSubcategoryModel } from '../models/AssetSubcategoryModel';
import type { IAssetSubcategory } from '../types/AssetSubcategory';

export class AssetSubcategoryRepository {
    
  async create(data: IAssetSubcategory) {
    return await AssetSubcategoryModel.create(data);
  }

  async findAll() {
    return await AssetSubcategoryModel.find()
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 })
      .lean();
  }

  async findById(id: string) {
    return await AssetSubcategoryModel.findById(id).populate('categoryId', 'name').lean();
  }

  async update(id: string, data: Partial<IAssetSubcategory>) {
    return await AssetSubcategoryModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id: string) {
    return await AssetSubcategoryModel.findByIdAndDelete(id);
  }
}
