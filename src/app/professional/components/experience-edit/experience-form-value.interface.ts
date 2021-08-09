import DateInterval from '@app/shared/components/date-interval-editor/date-interval.interface';
import { ExperienceFormFields } from './experience-form-fields.enum';

export default interface ExperienceFormValue {
  [ExperienceFormFields.title]: string;
  [ExperienceFormFields.company]: string;
  [ExperienceFormFields.interval]: DateInterval;
  [ExperienceFormFields.description]: string;
}
