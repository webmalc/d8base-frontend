import { SearchService } from '@app/api/services';
import { SearchFilterStateInterface } from '@app/search/interfaces/search-filter-state-interface';

const serviceTypes = (data: SearchFilterStateInterface): string => {
  const types = [];
  if (data.main.isOnlineService) {
    types.push('online');
  }
  if (data.main.isAtMasterLocationService) {
    types.push('professional');
  }
  if (data.main.isAtClientLocationService) {
    types.push('client');
  }

  return types.join(',');
};

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
    subcategories: data?.main?.subcategory?.map(({ id }) => id).join(','),

    /**
     * start price value (12.35)
     */
    startPrice: data?.main?.price.start,

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    startDatetime: data?.main?.datetime.from,

    /**
     * professional start age
     */
    startAge: data?.additional?.startAge,

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
    ratingFrom: data?.additional?.rating,

    /**
     * search term query param
     */
    query: void 0,

    /**
     * professional level
     */
    professionalLevel: data?.additional?.professionalLevel?.value,

    /**
     * price currency (usd)
     */
    priceCurrency: data?.main?.price?.currency?.currency,

    /**
     * postal code ID
     */
    postalCode: void 0,

    /**
     * multiple methods may be separated by commas
     */
    paymentMethods: data?.additional?.paymentMethods?.map(({ value }) => value).join(', '),
    onlyWithReviews: data?.additional?.onlyWithReviews,
    onlyWithPhotos: data?.additional?.onlyWithPhotos,
    onlyWithFixedPrice: data?.additional?.onlyWithFixedPrice,
    onlyWithCertificates: data?.additional?.onlyWithCertificates,
    onlyWithAutoOrderConfirmation: data.main.isInstantBooking,

    /**
     * multiple country IDs may be separated by commas
     */
    nationalities: data?.additional?.nationalities?.map(({ id }) => id).join(', '),

    /**
     * max distance
     */
    maxDistance: data?.main?.radius?.distance,

    /**
     * longitude (-79.3849)
     */
    longitude: `${data?.main?.location?.coordinates?.longitude}`,

    /**
     * latitude (43.6529)
     */
    latitude: `${data?.main?.location?.coordinates?.latitude}`,

    /**
     * multiple values may be separated by commas
     */
    languages: data?.additional?.languages?.map(({ code }) => code).join(', '),

    /**
     * male: 0,                 female: 1
     */
    gender: void 0,

    /**
     * professional experience
     */
    experience: data?.additional?.experience,

    /**
     * end price value (16.50)
     */
    endPrice: data?.main?.price.end,

    /**
     * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
     */
    endDatetime: data?.main?.datetime.to,

    /**
     * professional end age
     */
    endAge: data?.additional?.endAge,

    /**
     * district ID
     */
    district: void 0,

    /**
     * country ID
     */
    country: data?.main?.location?.country?.id,

    /**
     * city ID
     */
    city: data?.main?.location?.city?.id,

    /**
     * multiple category IDs may be separated by commas
     */
    categories: data?.main?.category?.map(({ id }) => id).join(','),
  };
};
