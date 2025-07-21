import type { VendorRepository } from '../repositories/VendorRepository';
import type { IVendor } from '../types/Vendor';

export class VendorService {
  constructor(private readonly repo: VendorRepository) {}

  async create(data: IVendor) {
    return await this.repo.create(data);
  }

  async getAll() {
    return await this.repo.findAll();
  }

  async getById(id: string) {
    return await this.repo.findById(id);
  }

  async update(id: string, data: Partial<IVendor>) {
    return await this.repo.update(id, data);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
