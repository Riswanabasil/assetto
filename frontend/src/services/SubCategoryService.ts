
import axios from "../api/axios";
import type { IAssetSubcategory, IAssetCategory } from "../types/asset";

// Get all subcategories
export async function getAllSubcategories(): Promise<IAssetSubcategory[]> {
  const res = await axios.get("/asset-subcategories");
  return res.data;
}

// Create subcategory
export async function createSubcategory(data: {
  name: string;
  description?: string;
  categoryId: string;
}): Promise<IAssetSubcategory> {
  const res = await axios.post("/asset-subcategories", data);
  return res.data;
}

// Update subcategory
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

// Delete subcategory
export async function deleteSubcategory(id: string): Promise<void> {
  await axios.delete(`/asset-subcategories/${id}`);
}

// Fetch all categories (used in dropdown)
export async function getAllCategories(): Promise<IAssetCategory[]> {
  const res = await axios.get("/asset-categories");
  return res.data;
}
