import { ManufacturerModel } from '../models/ManufacturerModel';
import type { IManufacturer } from '../types/Manufacturer';

export class ManufacturerRepository {
  async create(data: IManufacturer) {
    return await ManufacturerModel.create(data);
  }

  async findAll(): Promise<IManufacturer[]> {
    return await ManufacturerModel.find().sort({ createdAt: -1 }).lean();
  }

  async findById(id: string): Promise<IManufacturer | null> {
    return await ManufacturerModel.findById(id).lean();
  }

  async update(id: string, data: Partial<IManufacturer>) {
    return await ManufacturerModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id: string) {
    return await ManufacturerModel.findByIdAndDelete(id);
  }
}
