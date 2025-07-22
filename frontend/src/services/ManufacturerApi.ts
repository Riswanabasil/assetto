import axios from "../api/axios";
import type { IManufacturer } from "../types/manufacturer";

const BASE = "/manufacturers";

export async function getManufacturers(): Promise<IManufacturer[]> {
  const res = await axios.get(BASE);
  return res.data;
}

export async function createManufacturer(data: Omit<IManufacturer, "_id">): Promise<IManufacturer> {
  const res = await axios.post(BASE, data);
  return res.data;
}

export async function updateManufacturer(id: string, data: Omit<IManufacturer, "_id">): Promise<IManufacturer> {
  const res = await axios.put(`${BASE}/${id}`, data);
  return res.data;
}

export async function deleteManufacturer(id: string): Promise<void> {
  await axios.delete(`${BASE}/${id}`);
}
