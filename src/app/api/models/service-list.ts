/* tslint:disable */
import { ServiceLocationInline } from './service-location-inline';
import { Price } from './price';
import { ServiceTagList } from './service-tag-list';
export interface ServiceList {
    /**
     * step for booking in minutes
     */
    booking_interval?: number;
    created?: string;
    description?: null | string;

    /**
     * duration in minutes
     */
    duration: number;
    id?: number;

    /**
     * are orders confirmed automatically?
     */
    is_auto_order_confirmation?: boolean;
    is_base_schedule?: boolean;
    is_enabled?: boolean;
    locations?: Array<ServiceLocationInline>;
    modified?: string;
    name: string;
    price?: Price;
    professional: number;
    service_type: 'online' | 'professional' | 'client';
    tags?: Array<ServiceTagList>;
}
