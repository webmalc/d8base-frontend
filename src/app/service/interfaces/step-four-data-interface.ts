import { User } from '@app/core/models/user';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';

export interface StepFourDataInterface {
  isNewMaster: boolean;
  isNewUser: boolean;
  user?: User;
  country?: Country;
  city?: City;
}
