import axios from "../api/axios";
import type { GRNPayloads } from "../types/grn";

export async function createGRN(data: GRNPayloads) {
  const res = await axios.post("/grns", data);
  return res.data;
}

export async function getAllGRNs() {
  const res = await axios.get("/grns");
  return res.data;
}

export async function getGRNById(id: string) {
  const res = await axios.get(`/grns/${id}`);
  return res.data;
}

export async function updateGRN(id: string, data: GRNPayloads) {
  const res = await axios.put(`/grns/${id}`, data);
  return res.data;
}

export async function deleteGRN(id: string) {
  const res = await axios.delete(`/grns/${id}`);
  return res.data;
}

export async function filterGRNs(vendorId?: string, branchId?: string, startDate?: string, endDate?: string) {
  const res = await axios.get("/grns/filter", {
    params: { vendorId, branchId, startDate, endDate }
  });
  return res.data;
}