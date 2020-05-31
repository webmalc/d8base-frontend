import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocationFormFields} from '@app/shared/enums/location-form-fields';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';

@Injectable({
    providedIn: 'root'
})
export class LocationFormService {

    public form: FormGroup;
    private defaultLocationListLength: number;

    constructor(private formBuilder: FormBuilder) {
    }

    public addLocation(location?: ClientLocationInterface): void {
        this.getLocationFormArray().push(
            this.formBuilder.group({
                [LocationFormFields.Country]: [location?.country ?? undefined, [Validators.required]],
                [LocationFormFields.Region]: location?.region ?? undefined,
                [LocationFormFields.Subregion]: location?.subregion ?? undefined,
                [LocationFormFields.City]: [location?.city ?? undefined, [Validators.required]],
                [LocationFormFields.District]: location?.district ?? undefined,
                [LocationFormFields.PostalCode]: location?.postal_code ?? undefined,
                [LocationFormFields.Address]: location?.address ?? undefined,
                [LocationFormFields.Coordinates]: location?.coordinates ?? undefined,
                [LocationFormFields.Timezone]: location?.timezone ?? undefined,
                [LocationFormFields.IsDefault]: location?.is_default ?? undefined,
                [LocationFormFields.ID]: location?.id ?? undefined,
            })
        );
    }


    public createForm(locationList?: ClientLocationInterface[]): FormGroup {
        this.defaultLocationListLength = locationList?.length;
        this.form = this.formBuilder.group({
            [LocationFormFields.Location]: this.formBuilder.array([])
        });
        locationList?.forEach(location => this.addLocation(location));
        this.processDisabledFields(locationList);

        return this.form;
    }

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid || this.getLocationFormArray.length !== this.defaultLocationListLength);
    }

    public removeLocation(index: number): void {
        this.getLocationFormArray().removeAt(index);
    }

    public getLocationFormArray(): FormArray {
        return this.form.get(LocationFormFields.Location) as FormArray;
    }

    public setControlDisabled(value: boolean, controlName: string, index: number): void {
        const control = ((this.form.controls[LocationFormFields.Location] as FormArray)
            .controls[index] as FormGroup).controls[controlName] as FormControl;
        if (!control.value) {
            value ? control.disable() : control.enable();
        }
    }

    public getFieldValue<T>(index: number, field: string): T {
        return (((this.form.controls[LocationFormFields.Location] as FormArray)
            .controls[index] as FormGroup).controls[field] as FormControl).value;
    }

    private processDisabledFields(locationList: ClientLocationInterface[]): void {
        locationList.forEach((location, index) => {
            if (!location?.country) {
                this.setControlDisabled(true, LocationFormFields.Region, index);
                this.setControlDisabled(true, LocationFormFields.Subregion, index);
                this.setControlDisabled(true, LocationFormFields.City, index);
                this.setControlDisabled(true, LocationFormFields.District, index);
            }
            if (!location?.region) {
                this.setControlDisabled(true, LocationFormFields.Subregion, index);
            }
            if (!location?.city) {
                this.setControlDisabled(true, LocationFormFields.District, index);
            }
        });
    }
}
