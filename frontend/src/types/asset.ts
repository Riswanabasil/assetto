export interface IAssetCategory {
  _id: string;
  name: string;
  description?: string;
}

export interface IAssetSubcategory {
  _id: string;
  name: string;
  description?: string;
  categoryId: IAssetCategory | string;
}
