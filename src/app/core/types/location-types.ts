import {District} from '@app/core/models/district';
import {Region} from '@app/core/models/region';
import {Subregion} from '@app/core/models/subregion';
import {City} from '@app/profile/models/city';
import {Country} from '@app/profile/models/country';

export type LocationTypes = Country | Region | Subregion
    | City | District | Country[] | Region[] | Subregion[] | City[] | District[];
