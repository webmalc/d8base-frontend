import { Component, forwardRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgDestroyService } from '@app/core/services';
import { descriptionValidator } from '@app/core/validators';
import { ServiceDetailsInterface } from '@app/service/pages/service-wizard-page/interfaces';
import { AggregatedState } from '@app/service/pages/service-wizard-page/interfaces/steps-state.type';
import { takeUntil } from 'rxjs/operators';
import { StepComponent } from '../step/step';

@Component({
  selector: 'app-service-details-step',
  templateUrl: './service-details-step.component.html',
  styleUrls: ['./service-details-step.component.scss'],
  providers: [
    {
      provide: StepComponent,
      useExisting: forwardRef(() => ServiceDetailsStepComponent),
    },
    NgDestroyService,
  ],
})
export class ServiceDetailsStepComponent extends StepComponent<ServiceDetailsInterface> {
  public files: File[] = [];
  public formFields: { [K in keyof ServiceDetailsInterface]: keyof ServiceDetailsInterface } = {
    description: 'description',
    photos: 'photos',
    tags: 'tags',
  };

  constructor(private readonly ngDestroy$: NgDestroyService) {
    super();
    this.form = this.createForm();
    this.subscribePhotosControl();
  }

  public onSelect(files: File[]): void {
    this.files = this.files.concat(files);
    this.setPhotosControlValue(this.files);
  }

  public onRemove(index: number): void {
    this.files = [...this.files.slice(0, index), ...this.files.slice(index + 1)];
    this.setPhotosControlValue(this.files);
  }

  public setState(state: AggregatedState): void {
    const newValue: ServiceDetailsInterface = {
      description: state.description ?? '',
      photos: state.photos ?? [],
      tags: state.tags ?? [],
    };
    this.form.setValue(newValue);
  }

  private createForm(): FormGroup {
    return new FormGroup({
      [this.formFields.description]: new FormControl('', descriptionValidator),
      [this.formFields.photos]: new FormControl([]),
      [this.formFields.tags]: new FormControl([]),
    });
  }

  private setPhotosControlValue(files: File[]): void {
    this.form.controls[this.formFields.photos].setValue(files);
  }

  private subscribePhotosControl(): void {
    this.form
      .get(this.formFields.photos)
      .valueChanges.pipe(takeUntil(this.ngDestroy$))
      .subscribe(files => {
        this.files = files;
      });
  }
}
