export interface IAssetSubcategory {
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
  categoryId: string;
}
