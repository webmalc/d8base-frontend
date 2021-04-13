import { SearchService } from '@app/api/services';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';

const serviceTypes = (data: SearchFilterStateInterface): string => {
  const types = [];
  if (data.isOnlineService) {
    types.push('online');
  }
  if (data.isAtMasterLocationService) {
    types.push('professional');
  }
  if (data.isAtClientLocationService) {
    types.push('client');
  }

  return types.join(',') || null;
};

const stringOrNull = (value: number): string | null => value ? `${ value }` : null;

export const searchFilterStateInterfaceToSearchListParamsAdapter = (data: SearchFilterStateInterface): SearchService.SearchListParams => {
  if (!data) {
    return;
  }

  return {
    /**
     * multiple values may be separated by commas
     */
    tags: void 0,

    /**
     * subregion ID
     */
    subregion: void 0,

    /**
     * multiple subcategory IDs may be separated by commas
     */
    subcategories: data?.subcategory?.map(({ id }) => id).join(','),

    /**
     * start price value (12.35)
     */
    startPrice: data?.price.start,

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    startDatetime: data?.datetime.from,

    /**
     * professional start age
     */
    startAge: data?.startAge,

    /**
     * multiple types may be separated by commas
     */
    serviceTypes: serviceTypes(data),

    /**
     * region ID
     */
    region: void 0,

    /**
     * professional rating
     */
    ratingFrom: data?.rating,

    /**
     * search term query param
     */
    query: data?.query,

    /**
     * professional level
     */
    professionalLevel: data?.professionalLevel?.value,

    /**
     * price currency (usd)
     */
    priceCurrency: data?.price?.currency?.currency,

    /**
     * postal code ID
     */
    postalCode: void 0,

    /**
     * multiple methods may be separated by commas
     */
    paymentMethods: data?.paymentMethods?.map(({ value }) => value).join(', '),
    onlyWithReviews: data?.onlyWithReviews,
    onlyWithPhotos: data?.onlyWithPhotos,
    onlyWithFixedPrice: data?.onlyWithFixedPrice,
    onlyWithCertificates: data?.onlyWithCertificates,
    onlyWithAutoOrderConfirmation: data.isInstantBooking,

    /**
     * multiple country IDs may be separated by commas
     */
    nationalities: data?.nationalities?.map(({ id }) => id).join(', '),

    /**
     * max distance
     */
    maxDistance: data?.radius?.distance,

    /**
     * longitude (-79.3849)
     */
    longitude: stringOrNull(data?.location?.coordinates?.longitude),

    /**
     * latitude (43.6529)
     */
    latitude: stringOrNull(data?.location?.coordinates?.latitude),

    /**
     * multiple values may be separated by commas
     */
    languages: data?.languages?.map(({ code }) => code).join(', '),

    /**
     * male: 0,                 female: 1
     */
    gender: void 0,

    /**
     * professional experience
     */
    experience: data?.experience,

    /**
     * end price value (16.50)
     */
    endPrice: data?.price.end,

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    endDatetime: data?.datetime.to,

    /**
     * professional end age
     */
    endAge: data?.endAge,

    /**
     * district ID
     */
    district: void 0,

    /**
     * country ID
     */
    country: data?.location?.country?.id,

    /**
     * city ID
     */
    city: data?.location?.city?.id,

    /**
     * multiple category IDs may be separated by commas
     */
    categories: data?.category?.map(({ id }) => id).join(','),
  };
};
