export interface GRNLineItem {
  subcategoryId: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  taxPercent: number;
  totalAmount: number;
}

export interface GRNPayload {
  grnNumber: string;
  grnDate: string;
  invoiceNumber: string;
  vendorId: string;
  branchId: string;
  items: GRNLineItem[];
}

export interface GRNResponse extends GRNPayload {
  _id: string;
  vendor: string;
  branch: string;
  totalAmount: number;
}

export interface IVendor {
  _id: string;
  name: string;
}

export interface IBranch {
  _id: string;
  name: string;
}

export interface IGRNFilters {
  vendorId: string;
  branchId: string;
  startDate: string;
  endDate: string;
}

export interface IGRNListItem {
  grnNumber: string;
  grnDate: string;
  invoiceNumber: string;
  vendor: string;
  branch: string;
  totalAmount: number;
}

export interface GRNPayloads {
  grnDate: string;
  invoiceNumber: string;
  vendorId: string;
  branchId: string;
  items: GRNLineItem[];
}