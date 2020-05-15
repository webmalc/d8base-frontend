import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationFormFields} from '@app/shared/enums/location-form-fields';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';

@Injectable({
    providedIn: 'root'
})
export class LocationFormService {

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    public createForm(
        location?: ClientLocationInterface
    ): FormGroup {
        this.form = this.formBuilder.group({
            [LocationFormFields.Country]: [location?.country, [Validators.required]],
            [LocationFormFields.Region]: [location?.region],
            [LocationFormFields.Subregion]: [location?.subregion],
            [LocationFormFields.City]: [location?.city, [Validators.required]],
            [LocationFormFields.District]: [location?.district],
            [LocationFormFields.PostalCode]: [location?.postal_code],
            [LocationFormFields.Address]: [location?.address],
            [LocationFormFields.Coordinates]: [location?.coordinates],
            // [LocationFormFields.Units]: [location?.units],
            [LocationFormFields.Timezone]: [location?.timezone]
        });
        this.processDisabledFields(location);

        return this.form;
    }

    public getFormFieldValue(formField: string): any {
        return this.form.get(formField).value;
    }

    public setControlDisabled(value: boolean, controlName: string): void {
        const control = this.form.controls[controlName] as FormControl;
        if (!control.value) {
            value ? control.disable() : control.enable();
        }
    }

    private processDisabledFields(location: ClientLocationInterface): void {
        if (!location?.country) {
            this.setControlDisabled(true, LocationFormFields.Region);
            this.setControlDisabled(true, LocationFormFields.Subregion);
            this.setControlDisabled(true, LocationFormFields.City);
            this.setControlDisabled(true, LocationFormFields.District);
        }
        if (!location?.region) {
            this.setControlDisabled(true, LocationFormFields.Subregion);
        }
        if (!location?.city) {
            this.setControlDisabled(true, LocationFormFields.District);
        }
    }
}
