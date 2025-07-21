import { Types } from 'mongoose';
import { GRNHeaderModel } from '../models/GRNHeaderModel';
import { IBranch } from '../types/Branch';
import type { IGRNHeader } from '../types/GRN';
import { IVendor } from '../types/Vendor';

export class GRNRepository {
  async create(data: IGRNHeader) {
    return await GRNHeaderModel.create(data);
  }

  async findAll() {
    return await GRNHeaderModel.find()
      .populate('vendorId', 'name')
      .populate('branchId', 'name')
      .populate('items.subcategoryId', 'name')
      .sort({ createdAt: -1 })
      .lean();
  }

  async findById(id: string) {
    return await GRNHeaderModel.findById(id)
      .populate('vendorId', 'name')
      .populate('branchId', 'name')
      .populate('items.subcategoryId', 'name')
      .lean();
  }

  async delete(id: string) {
    return await GRNHeaderModel.findByIdAndDelete(id);
  }

  async filterGRN(filters: {
  vendorId?: string;
  branchId?: string;
  startDate?: string;
  endDate?: string;
}) {
  const query: any = {};

if (filters.vendorId && Types.ObjectId.isValid(filters.vendorId)) {
      query.vendorId = new Types.ObjectId(filters.vendorId);
    }
 if (filters.branchId && Types.ObjectId.isValid(filters.branchId)) {
      query.branchId = new Types.ObjectId(filters.branchId);
    }
  if (filters.startDate || filters.endDate) {
    query.grnDate = {};
    if (filters.startDate) query.grnDate.$gte = new Date(filters.startDate);
    if (filters.endDate) query.grnDate.$lte = new Date(filters.endDate);
  }

  const result = await GRNHeaderModel.find(query)
     .populate<{ vendorId: { name: string }  }>("vendorId", "name")
    .populate<{branchId: { name: string }}>("branchId", "name")
    .sort({ grnDate: -1 })
    .lean();

  return result.map(grn => {
    const total = grn.items?.reduce(
      (sum: number, item: any) => sum + (item.totalAmount || 0),
      0
    );

    return {
      grnNumber: grn.grnNumber,
      grnDate: grn.grnDate,
      invoiceNumber: grn.invoiceNumber,
      vendor: grn.vendorId?.name,
      branch: grn.branchId?.name,
      totalAmount: total,
    };
  });
}

}
