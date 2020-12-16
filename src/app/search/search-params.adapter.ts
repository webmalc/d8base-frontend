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
        startPrice: void 0,

        /**
         * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
         */
        startDatetime: void 0,

        /**
         * professional start age
         */
        startAge: void 0,

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
        rating: void 0,

        /**
         * search term query param
         */
        query: void 0,

        /**
         * professional level
         */
        professionalLevel: void 0,

        /**
         * price currency (usd)
         */
        priceCurrency: void 0,

        /**
         * postal code ID
         */
        postalCode: void 0,

        /**
         * multiple methods may be separated by commas
         */
        paymentMethods: void 0,
        onlyWithReviews: void 0,
        onlyWithPhotos: void 0,
        onlyWithFixedPrice: void 0,
        onlyWithCertificates: void 0,
        onlyWithAutoOrderConfirmation: data.main.isInstantBooking,

        /**
         * multiple country IDs may be separated by commas
         */
        nationalities: void 0,

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
        languages: void 0,

        /**
         * male: 0,                 female: 1
         */
        gender: void 0,

        /**
         * professional experience
         */
        experience: void 0,

        /**
         * end price value (16.50)
         */
        endPrice: void 0,

        /**
         * YYYY-MM-DDTHH:mm:ss (2020-08-23T16:19:43)
         */
        endDatetime: void 0,

        /**
         * professional end age
         */
        endAge: void 0,

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
        categories: data?.main?.category?.map(({ id }) => id).join(',')
    };
};
