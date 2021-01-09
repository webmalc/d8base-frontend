import { PostalCode } from '@app/core/models/postal-code';
import { City } from '@app/profile/models/city';
import { Country } from '@app/profile/models/country';
import { Coords } from '@app/shared/interfaces/coords';
import { Expose } from 'class-transformer';

export class ExtendedLocation {
    @Expose() public country: Country;
    @Expose() public city?: City;
    @Expose() public postal?: PostalCode;
    @Expose() public coords?: Coords;

    public getLocationAsString(): string | null {
        if (this.country && this.city) {
            if (this.postal) {
                return `${this.country.name}, ${this.city.name}, ${this.postal.code}`;
            }

            return `${this.country.name}, ${this.city.name}`;
        }

        return null;
    }
}
