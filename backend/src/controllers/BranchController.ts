import { Request, Response } from 'express';
import { BranchService } from '../services/BranchService';



export class BranchController {
    constructor(private service:BranchService){

    }
  async create(req: Request, res: Response) {
    const created = await this.service.create(req.body);
    res.status(201).json(created);
  }

  async getAll(req: Request, res: Response) {
    const list = await this.service.getAll();
    res.json(list);
  }

  async getById(req: Request, res: Response) {
    const branch = await this.service.getById(req.params.id);
    res.json(branch);
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
