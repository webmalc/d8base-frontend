/* eslint-disable */
export interface ProfessionalEducation {
  created?: string;
  created_by?: number;
  deegree?: null | string;
  description?: null | string;
  end_date?: null | string;
  field_of_study?: null | string;
  id?: number;

  /**
   * Is the professional still learning here?
   */
  is_still_here?: boolean;
  modified?: string;
  modified_by?: number;
  professional: number;
  start_date?: null | string;

  /**
   * school/university
   */
  university: string;
}
