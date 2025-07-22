
import axios from "../api/axios"; 
import type { IBranch } from "../types/branch";

export async function getAllBranches(): Promise<IBranch[]> {
  const res = await axios.get("/branches");
  return res.data;
}

export async function createBranch(data: Partial<IBranch>): Promise<IBranch> {
  const res = await axios.post("/branches", data);
  return res.data;
}

export async function updateBranch(id: string, data: Partial<IBranch>): Promise<IBranch> {
  const res = await axios.put(`/branches/${id}`, data);
  return res.data;
}

export async function deleteBranch(id: string): Promise<void> {
  await axios.delete(`/branches/${id}`);
}
