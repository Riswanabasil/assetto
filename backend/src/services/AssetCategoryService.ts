import { Types } from 'mongoose';
import { AssetCategoryRepository } from '../repositories/AssetCategoryRepository'
import { IAssetCategory } from '../types/AssetCategory.js';



export class AssetCategoryService {
    constructor(private repo:AssetCategoryRepository){

    }
  async createCategory(data:IAssetCategory) {
    return await this.repo.create(data);
  }

  async getAllCategories() {
    return await this.repo.findAll();
  }

  async getCategoryById(id:string | Types.ObjectId) {
    return await this.repo.findById(id);
  }

  async updateCategory(id:string | Types.ObjectId, data:Partial<IAssetCategory>) {
    return await this.repo.update(id, data);
  }

  async deleteCategory(id:string | Types.ObjectId) {
    return await this.repo.delete(id);
  }
}
