
import axios from "../api/axios";
import type { IAssetSubcategory, IAssetCategory } from "../types/asset";


export async function getAllSubcategories(): Promise<IAssetSubcategory[]> {
  const res = await axios.get("/asset-subcategories");
  return res.data;
}


export async function createSubcategory(data: {
  name: string;
  description?: string;
  categoryId: string;
}): Promise<IAssetSubcategory> {
  const res = await axios.post("/asset-subcategories", data);
  return res.data;
}


export async function updateSubcategory(
  id: string,
  data: {
    name: string;
    description?: string;
    categoryId: string;
  }
): Promise<IAssetSubcategory> {
  const res = await axios.put(`/asset-subcategories/${id}`, data);
  return res.data;
}


export async function deleteSubcategory(id: string): Promise<void> {
  await axios.delete(`/asset-subcategories/${id}`);
}


export async function getAllCategories(): Promise<IAssetCategory[]> {
  const res = await axios.get("/asset-categories");
  return res.data;
}
