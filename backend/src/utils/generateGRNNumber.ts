import { GRNHeaderModel } from '../models/GRNHeaderModel';

export async function generateGRNNumber(): Promise<string> {
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const count = await GRNHeaderModel.countDocuments({
    createdAt: { $gte: monthStart, $lte: monthEnd }
  });

  const serial = String(count + 1).padStart(3, '0');
  return `GRN-${yearMonth}-${serial}`;
}
