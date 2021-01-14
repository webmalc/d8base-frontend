/* eslint-disable */
import { ProfessionalCertificateInline } from './professional-certificate-inline';
import { ProfessionalContactInline } from './professional-contact-inline';
import { ProfessionalEducationInline } from './professional-education-inline';
import { ProfessionalExperienceInline } from './professional-experience-inline';
import { ProfessionalLocationInline } from './professional-location-inline';
import { ProfessionalTagList } from './professional-tag-list';
import { UserExtended } from './user-extended';
export interface ProfessionalList {
  certificates?: Array<ProfessionalCertificateInline>;
  company?: null | string;
  contacts?: Array<ProfessionalContactInline>;
  created?: string;
  description?: null | string;
  educations?: Array<ProfessionalEducationInline>;
  experience?: null | number;
  experience_entries?: Array<ProfessionalExperienceInline>;
  id?: number;
  level?: null | 'junior' | 'middle' | 'senior';
  locations?: Array<ProfessionalLocationInline>;
  modified?: string;
  name: string;
  rating?: string;
  subcategory: number;
  tags?: Array<ProfessionalTagList>;
  user?: UserExtended;
}
