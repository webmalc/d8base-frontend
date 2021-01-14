/* eslint-disable */
import { ProfessionalList } from './professional-list';
import { ServiceList } from './service-list';
export interface Search {
    professional?: ProfessionalList;
    services?: Array<ServiceList>;
}
