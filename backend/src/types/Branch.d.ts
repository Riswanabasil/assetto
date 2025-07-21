export interface IBranch {
  name: string;
  location?: string;
  code?: string;
  status?: 'active' | 'inactive';
}
