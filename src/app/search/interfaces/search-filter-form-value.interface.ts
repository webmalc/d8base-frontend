import { FormControl } from '@angular/forms';
import { Category, City, Country, Rate, Subcategory, ServiceTag, ProfessionalList } from '@app/api/models';

export interface SearchFilterFormValue {
  query?: string;
  country?: Country;
  city?: City;
  category?: Category;
  subcategory?: Subcategory;
  tags?: ServiceTag[];
  isOnlineBooking?: boolean;
  isInstantBooking?: boolean;
  dateFrom?: string;
  dateTo?: string;
  timeFrom?: string;
  timeTo?: string;
  isOnlineService?: boolean;
  isAtMasterLocationService?: boolean;
  isAtClientLocationService?: boolean;
  priceCurrency?: Rate;
  priceStart?: string;
  priceEnd?: string;
  rating?: number;
  professionalLevel?: { value: ProfessionalList['level'] };
  paymentMethods?: { value: 'cash' | 'online' }[];
  onlyWithReviews?: boolean;
  onlyWithPhotos?: boolean;
  onlyWithFixedPrice?: boolean;
  onlyWithCertificates?: boolean;
  nationality?: Country;
  languages?: { code: string; name: string }[];
  experience?: number;
  startAge?: number;
  endAge?: number;
  exactDatetime?: boolean;
}

export type SearchFilterFormControls = { [K in keyof SearchFilterFormValue]: FormControl };
