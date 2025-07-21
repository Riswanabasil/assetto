export interface IAssetCategory {
  name: string;
  description?: string|null;
  status?: 'active' | 'inactive';
}
