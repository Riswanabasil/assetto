import api from '../api/axios';
import type { Category, CategoryPayload } from '../types/category';

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/asset-categories");
  return res.data;
};

export const createCategory = async (data: CategoryPayload): Promise<Category> => {
  const res = await api.post("/asset-categories", data);
  return res.data;
};

export const updateCategory = async (id: string, data: CategoryPayload): Promise<Category> => {
  const res = await api.put(`/asset-categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/asset-categories/${id}`);
};
