import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { Expose } from 'class-transformer';

export class MasterSchedule extends AbstractSchedule {
  @Expose() public professional: number;
}
