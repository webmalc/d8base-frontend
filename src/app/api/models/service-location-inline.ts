/* eslint-disable */
import { ProfessionalLocationInline } from './professional-location-inline';
export interface ServiceLocationInline {
  created?: string;
  id?: number;
  is_enabled?: boolean;
  location?: ProfessionalLocationInline;
  max_distance: number;
  modified?: string;
}
