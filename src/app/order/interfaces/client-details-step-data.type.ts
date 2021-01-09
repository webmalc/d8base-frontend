import { OrderClientDetailsFormFields } from '@app/order/enums/order-client-details-form';

export type ClientDetailsStepData = {
    [key in OrderClientDetailsFormFields]: string | boolean | number;
};
