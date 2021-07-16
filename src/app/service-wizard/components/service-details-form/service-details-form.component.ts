import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgDestroyService } from '@app/core/services';
import { descriptionValidator } from '@app/core/validators';
import { takeUntil } from 'rxjs/operators';
import { ServiceDetailsFormFields } from '../../enums/service-details.form-fields';

@Component({
  selector: 'app-service-details-form',
  templateUrl: './service-details-form.component.html',
  styleUrls: ['./service-details-form.component.scss'],
  providers: [NgDestroyService],
})
export class ServiceDetailsFormComponent {
  public files: File[] = [];
  public formFields = ServiceDetailsFormFields;
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly destroy$: NgDestroyService) {}

  public createForm(): FormGroup {
    this.form = this.fb.group({
      [this.formFields.description]: [null, descriptionValidator],
      [this.formFields.photos]: [],
    });

    this.subscribePhotosControl();

    return this.form;
  }

  public onSelect(files: File[]): void {
    this.files = this.files.concat(files);
    this.setPhotosControl(this.files);
  }

  public onRemove(index: number): void {
    this.files = [...this.files.slice(0, index), ...this.files.slice(index + 1)];
    this.setPhotosControl(this.files);
  }

  private setPhotosControl(files: File[]): void {
    this.form.get(this.formFields.photos).setValue(files);
  }

  private subscribePhotosControl(): void {
    this.form.get(this.formFields.photos).valueChanges.pipe(takeUntil(this.destroy$)).subscribe((files) => {
      this.files = files;
    });
  }
}
