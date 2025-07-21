import { BranchModel } from '../models/BranchModel';
import type { IBranch } from '../types/Branch';

export class BranchRepository {
  async create(data: IBranch) {
    return await BranchModel.create(data);
  }

  async findAll() {
    return await BranchModel.find().sort({ createdAt: -1 }).lean();
  }

  async findById(id: string) {
    return await BranchModel.findById(id).lean();
  }

  async update(id: string, data: Partial<IBranch>) {
    return await BranchModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id: string) {
    return await BranchModel.findByIdAndDelete(id);
  }
}
