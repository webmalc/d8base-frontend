import { ProfessionalList } from '@app/api/models';

export interface SavedProfessionalInterface<T extends number | ProfessionalList> {
  id: number;
  note: string;
  professional: T;
  created?: string;
  modified?: string;
  created_by?: number;
  modified_by?: number;
}
