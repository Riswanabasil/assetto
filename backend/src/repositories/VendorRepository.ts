import { VendorModel } from '../models/VendorModel';
import type { IVendor } from '../types/Vendor';

export class VendorRepository {
  async create(data: IVendor) {
    return await VendorModel.create(data);
  }

  async findAll(): Promise<IVendor[]> {
    return await VendorModel.find().sort({ createdAt: -1 }).lean();
  }

  async findById(id: string): Promise<IVendor | null> {
    return await VendorModel.findById(id).lean();
  }

  async update(id: string, data: Partial<IVendor>) {
    return await VendorModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async delete(id: string) {
    return await VendorModel.findByIdAndDelete(id);
  }
}
