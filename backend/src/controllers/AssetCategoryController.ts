import { Request, Response } from 'express';
import { AssetCategoryService } from '../services/AssetCategoryService';



export class AssetCategoryController {
    constructor(private service:AssetCategoryService){

    }
  async create(req: Request, res: Response) {
    const created = await this.service.createCategory(req.body);
    res.status(201).json(created);
  }

  async getAll(req: Request, res: Response) {
    const categories = await this.service.getAllCategories();
    res.json(categories);
  }

  async getById(req: Request, res: Response) {
    const category = await this.service.getCategoryById(req.params.id);
    res.json(category);
  }

  async update(req: Request, res: Response) {
    const updated = await this.service.updateCategory(req.params.id, req.body);
    res.json(updated);
  }

  async remove(req: Request, res: Response) {
    await this.service.deleteCategory(req.params.id);
    res.status(204).send();
  }
}
