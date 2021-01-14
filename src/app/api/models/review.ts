/* tslint:disable */
export interface Review {
  created?: string;
  created_by?: number;
  description: string;
  id?: number;
  modified?: string;
  modified_by?: number;
  professional: number;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: null | string;
}
