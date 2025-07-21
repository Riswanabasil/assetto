import { AssetSubcategoryRepository } from '../repositories/AssetSubcategoryRepository';
import { IAssetSubcategory } from '../types/AssetSubcategory';



export class AssetSubcategoryService {
    constructor(private repo:AssetSubcategoryRepository){

    }
  async create(data:IAssetSubcategory) {
    return await this.repo.create(data);
  }

  async getAll() {
    return await this.repo.findAll();
  }

  async getById(id:string) {
    return await this.repo.findById(id);
  }

  async update(id:string, data:Partial<IAssetSubcategory>) {
    return await this.repo.update(id, data);
  }

  async delete(id:string) {
    return await this.repo.delete(id);
  }
}
