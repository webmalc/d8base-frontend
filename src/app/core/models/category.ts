import { Expose } from 'class-transformer';

export class Category {
  @Expose() public id: number;
  @Expose() public name: string;
  @Expose() public code: string;
  @Expose() public description: string;
  @Expose() public order: number;
}
