import { Request, Response } from 'express';
import { AssetSubcategoryService } from '../services/AssetSubcategoryService';



export class AssetSubcategoryController {
    constructor(
        private service:AssetSubcategoryService
    ){
    
    }
  async create(req: Request, res: Response) {
    const result = await this.service.create(req.body);
    res.status(201).json(result);
  }

  async getAll(req: Request, res: Response) {
    const data = await this.service.getAll();
    res.json(data);
  }

  async getById(req: Request, res: Response) {
    const data = await this.service.getById(req.params.id);
    res.json(data);
  }

  async update(req: Request, res: Response) {
    const data = await this.service.update(req.params.id, req.body);
    res.json(data);
  }

  async delete(req: Request, res: Response) {
    await this.service.delete(req.params.id);
    res.status(204).send();
  }
}
