import { Category, City, Country, Rate, Subcategory } from '@app/api/models';
import { Tag } from '@app/professional/models/tag';

export interface SearchFilterFormValue {
  query?: string;
  country?: Country;
  city?: City;
  category?: Category[];
  subcategory?: Subcategory[];
  tags?: Tag[];
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
  professionalLevel?: { value: 'junior' | 'middle' | 'senior' };
  paymentMethods?: { value: 'cash' | 'online' }[];
  onlyWithReviews?: boolean;
  onlyWithPhotos?: boolean;
  onlyWithFixedPrice?: boolean;
  onlyWithCertificates?: boolean;
  nationalities?: Country[];
  languages?: { code: string; name: string }[];
  experience?: number;
  startAge?: number;
  endAge?: number;
  exactDatetime?: boolean;
}
