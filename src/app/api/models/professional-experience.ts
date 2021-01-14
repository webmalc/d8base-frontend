/* tslint:disable */
export interface ProfessionalExperience {
  company: string;
  created?: string;
  created_by?: number;
  description?: null | string;
  end_date?: null | string;
  id?: number;

  /**
   * Is the professional still working here?
   */
  is_still_here?: boolean;
  modified?: string;
  modified_by?: number;
  professional: number;
  start_date?: null | string;
  title: string;
}
