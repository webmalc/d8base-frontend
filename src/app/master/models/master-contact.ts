import { ClientContactInterface } from '@app/shared/interfaces/client-contact-interface';
import { Expose } from 'class-transformer';

/* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
export class MasterContact implements ClientContactInterface {
  @Expose() public id: number;
  @Expose() public professional?: number;
  @Expose() public contact: number;
  @Expose() public contact_code?: string;
  @Expose() public contact_display?: string;
  @Expose() public value: string;
}
