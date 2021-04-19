import { SearchFilterStateInterface } from '../interfaces/search-filter-state-interface';

type SubTypeObject<T> = Pick<
  T,
  {
    [K in keyof Partial<T>]: T[K] extends object ? K : never;
  }[keyof T]
>;

type ObjectKeys<T> = {
  readonly [K in keyof Partial<SubTypeObject<T>>]: K;
};

type FormGroupNames = Required<Pick<ObjectKeys<SearchFilterStateInterface>, 'location' | 'datetime' | 'price'>>;

type FormFieldsNames<T> = {
  readonly [K in keyof Required<T>]: K extends keyof FormGroupNames ? FormFieldsNames<T[K]> : K;
};

type FormFieldsType = FormFieldsNames<SearchFilterStateInterface>;

export const SearchFilterFormGroups: FormGroupNames = {
  location: 'location',
  datetime: 'datetime',
  price: 'price',
};

export const SearchFilterFormFields: FormFieldsType = {
  query: 'query',
  location: {
    country: 'country',
    city: 'city',
    coordinates: 'coordinates',
  },
  category: 'category',
  subcategory: 'subcategory',
  tags: 'tags',
  isOnlineBooking: 'isOnlineBooking',
  isInstantBooking: 'isInstantBooking',
  datetime: {
    from: 'from',
    to: 'to',
  },
  isOnlineService: 'isOnlineService',
  isAtMasterLocationService: 'isAtMasterLocationService',
  isAtClientLocationService: 'isAtClientLocationService',
  price: {
    currency: 'currency',
    start: 'start',
    end: 'end',
  },
  rating: 'rating',
  professionalLevel: 'professionalLevel',
  paymentMethods: 'paymentMethods',
  onlyWithReviews: 'onlyWithReviews',
  onlyWithPhotos: 'onlyWithPhotos',
  onlyWithFixedPrice: 'onlyWithFixedPrice',
  onlyWithCertificates: 'onlyWithCertificates',
  nationalities: 'nationalities',
  languages: 'languages',
  experience: 'experience',
  startAge: 'startAge',
  endAge: 'endAge',
};
