import { Expose } from 'class-transformer';

export class PostalCode {
  // tslint:disable:variable-name
  @Expose() public id: number;
  @Expose() public slug: string;
  @Expose() public name: string;
  @Expose() public alt_names: string[];
  @Expose() public code: string;
  @Expose() public region_name: string;
  @Expose() public subregion_name: string;
  @Expose() public district_name: string;
  @Expose() public country: number;
  @Expose() public region: number;
  @Expose() public subregion: number;
  @Expose() public city: number;
  @Expose() public district: number;
  @Expose() public names: string;
  @Expose() public name_full: string;
}
