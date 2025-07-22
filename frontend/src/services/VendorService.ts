import axios from "../api/axios";
import type { IVendor } from "../types/vendor";

export async function fetchVendors(): Promise<IVendor[]> {
  const res = await axios.get("/vendors");
  return res.data;
}

export async function createVendor(data: IVendor): Promise<IVendor> {
  const res = await axios.post("/vendors", data);
  return res.data;
}

export async function updateVendor(id: string, data: IVendor): Promise<IVendor> {
  const res = await axios.put(`/vendors/${id}`, data);
  return res.data;
}

export async function deleteVendor(id: string): Promise<void> {
  await axios.delete(`/vendors/${id}`);
}
