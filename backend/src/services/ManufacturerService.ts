import type { ManufacturerRepository } from '../repositories/ManufacturerRepository';
import type { IManufacturer } from '../types/Manufacturer';

export class ManufacturerService {
  constructor(private readonly repo: ManufacturerRepository) {}

  async create(data: IManufacturer) {
    return await this.repo.create(data);
  }

  async getAll() {
    return await this.repo.findAll();
  }

  async getById(id: string) {
    return await this.repo.findById(id);
  }

  async update(id: string, data: Partial<IManufacturer>) {
    return await this.repo.update(id, data);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
