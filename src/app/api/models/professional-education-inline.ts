/* eslint-disable */
export interface ProfessionalEducationInline {
  deegree?: null | string;
  description?: null | string;
  end_date?: null | string;
  field_of_study?: null | string;
  id?: number;

  /**
   * Is the professional still learning here?
   */
  is_still_here?: boolean;
  start_date?: null | string;

  /**
   * school/university
   */
  university: string;
}
