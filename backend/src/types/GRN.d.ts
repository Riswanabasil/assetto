export interface IGRNLineItem {
  subcategoryId: string;
  itemDescription?: string;
  quantity: number;
  unitPrice: number;
  taxPercent?: number;
  taxableValue: number;
  totalAmount: number;
}

export interface IGRNHeader {
  grnNumber: string;
  grnDate: Date;
  invoiceNumber: string;
  vendorId: string;
  branchId: string;
  items: IGRNLineItem[];
}
