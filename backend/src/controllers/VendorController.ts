import { Request, Response } from 'express';
import { VendorService } from '../services/VendorService';



export class VendorController {
    constructor(
        private service:VendorService
    ){

    }
  async create(req: Request, res: Response) {
    const result = await this.service.create(req.body);
    res.status(201).json(result);
  }

  async getAll(req: Request, res: Response) {
    const vendors = await this.service.getAll();
    res.json(vendors);
  }

  async getById(req: Request, res: Response) {
    const vendor = await this.service.getById(req.params.id);
    res.json(vendor);
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
