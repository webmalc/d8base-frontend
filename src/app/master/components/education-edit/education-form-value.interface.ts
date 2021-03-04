import DateInterval from '@app/shared/components/date-interval-editor/date-interval.interface';
import { EducationFormFields } from './education-form-fields.enum';

export default interface EducationFormValue {
  [EducationFormFields.university]: string;
  [EducationFormFields.degree]: string;
  [EducationFormFields.field_of_study]: string;
  [EducationFormFields.interval]: DateInterval;
  [EducationFormFields.description]: string;
}
