import { Request, Response } from 'express';
import { ManufacturerRepository } from '../repositories/ManufacturerRepository';
import { ManufacturerService } from '../services/ManufacturerService';



export class ManufacturerController {
    constructor(
        private service:ManufacturerService
    ){

    }
  async create(req: Request, res: Response) {
    const result = await this.service.create(req.body);
    res.status(201).json(result);
  }

  async getAll(req: Request, res: Response) {
    const list = await this.service.getAll();
    res.json(list);
  }

  async getById(req: Request, res: Response) {
    const item = await this.service.getById(req.params.id);
    res.json(item);
  }

  async update(req: Request, res: Response) {
    const updated = await this.service.update(req.params.id, req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    await this.service.delete(req.params.id);
    res.status(204).send();
  }
}
