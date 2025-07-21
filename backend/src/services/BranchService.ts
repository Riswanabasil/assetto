import { BranchRepository } from '../repositories/BranchRepository';
import { IBranch } from '../types/Branch';



export class BranchService {
    constructor(private repo:BranchRepository){}
  async create(data:IBranch) {
    return await this.repo.create(data);
  }

  async getAll() {
    return await this.repo.findAll();
  }

  async getById(id:string) {
    return await this.repo.findById(id);
  }

  async update(id:string, data:Partial<IBranch>) {
    return await this.repo.update(id, data);
  }

  async delete(id:string) {
    return await this.repo.delete(id);
  }
}
