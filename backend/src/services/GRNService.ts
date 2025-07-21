import { generateGRNNumber } from '../utils/generateGRNNumber';
import type { GRNRepository } from '../repositories/GRNRepository';
import type { IGRNHeader } from '../types/GRN';

export class GRNService {
  constructor(private readonly repo: GRNRepository) {}

  async create(data: Omit<IGRNHeader, 'grnNumber'>) {
    const grnNumber = await generateGRNNumber();

    const items = data.items.map(item => {
      const taxableValue = item.quantity * item.unitPrice;
      const taxAmount = (taxableValue * (item.taxPercent || 0)) / 100;
      const totalAmount = taxableValue + taxAmount;

      return {
        ...item,
        taxableValue,
        totalAmount
      };
    });

    return await this.repo.create({
      ...data,
      grnNumber,
      items
    });
  }

  async getAll() {
    return await this.repo.findAll();
  }

  async getById(id: string) {
    return await this.repo.findById(id);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }

  async filterGRN(filters: {
  vendorId?: string;
  branchId?: string;
  startDate?: string;
  endDate?: string;
}) {
  return await this.repo.filterGRN(filters);
}

}
