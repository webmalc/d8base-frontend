import { Price } from '@app/service/models/price';
import { Expose, Type } from 'class-transformer';
import { ServiceLocationInline } from '../../api/models';

export class Service {
  /* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
  @Expose() public id: number;
  @Expose() public professional: number;
  @Expose() public name: string;
  @Expose() public description: string;
  @Expose() public duration: number;
  @Expose() public service_type: string;
  @Expose() public is_base_schedule: boolean;
  @Expose() public is_enabled: boolean;
  @Type(() => Price)
  public price: Price;
  @Expose() public locations: ServiceLocationInline[];
  @Expose() public is_auto_order_confirmation: boolean;
  @Expose() public tags: { name: string }[];
}
