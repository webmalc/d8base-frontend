import { Country, Rate } from '@app/api/models';
import { Category } from '@app/core/models/category';
import { Subcategory } from '@app/core/models/subcategory';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { Tag } from '@app/master/models/tag';

export interface SearchFilterStateInterface {
  location: SearchLocationDataInterface;
  radius: {
    distance: number;
    units: boolean;
  };
  category: Category[];
  subcategory: Subcategory[];
  tags: Tag[];
  isOnlineBooking: boolean;
  isInstantBooking: boolean;
  datetime: {
    from: string;
    to: string;
  };
  isOnlineService: boolean;
  isAtMasterLocationService: boolean;
  isAtClientLocationService: boolean;
  price: {
    currency: Rate;
    start: string;
    end: string;
  };
  rating: number;
  professionalLevel: { value: 'junior' | 'middle' | 'senior' };
  paymentMethods: { value: 'cash' | 'online' }[];
  onlyWithReviews: boolean;
  onlyWithPhotos: boolean;
  onlyWithFixedPrice: boolean;
  onlyWithCertificates: boolean;
  nationalities: Country[];
  languages: { code: string; name: string }[];
  experience: number;
  startAge: number;
  endAge: number;
}
