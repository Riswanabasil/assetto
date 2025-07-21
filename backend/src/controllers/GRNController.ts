import { Request, Response } from 'express';
import { GRNService } from '../services/GRNService.js';


export class GRNController {
    constructor(
        private service:GRNService
    ){

    }
  async create(req: Request, res: Response) {
    const grn = await this.service.create(req.body);
    res.status(201).json(grn);
  }

  async getAll(req: Request, res: Response) {
    const list = await this.service.getAll();
    res.json(list);
  }

  async getById(req: Request, res: Response) {
    const grn = await this.service.getById(req.params.id);
    res.json(grn);
  }

  async delete(req: Request, res: Response) {
    await this.service.delete(req.params.id);
    res.status(204).send();
  }

  async filterGRN(req: Request, res: Response) {
  try {
    const filters = {
      vendorId: req.query.vendorId as string,
      branchId: req.query.branchId as string,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
    };

    const grns = await this.service.filterGRN(filters);
    res.status(200).json(grns);
  } catch (error) {
    res.status(500).json({ message: "Error filtering GRNs", error });
  }
}

}
