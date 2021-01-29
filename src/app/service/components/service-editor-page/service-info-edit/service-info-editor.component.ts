import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Price, Service } from '@app/api/models';
import { ServiceEditor } from '../service-editor';
import ServiceEditorContext from '../service-editor-context.interface';
import { ServiceEditorDepsService } from '../service-editor-deps.service';
import { ServiceInfoEditFields } from './service-info-edit-fields.enum';

@Component({
  selector: 'app-service-info-edit',
  templateUrl: './service-info-editor.component.html',
  styleUrls: ['./service-info-editor.component.scss'],
})
export class ServiceInfoEditorComponent extends ServiceEditor {
  public formFields = ServiceInfoEditFields;

  constructor(route: ActivatedRoute, deps: ServiceEditorDepsService) {
    super(route, deps);
  }

  public submit({ form, service }: ServiceEditorContext): void {
    const { name, description, duration, price, paymentMethods } = form.value;
    const newPrice: Price = {
      ...price,
      payment_methods: paymentMethods,
    };
    const newService: Service = {
      ...service,
      name,
      description,
      duration,
      price: newPrice,
    };
    this.saveAndReturn(newService);
  }

  protected createForm(service: Service): FormGroup {
    return new FormGroup({
      [this.formFields.name]: new FormControl(service.name, Validators.required),
      [this.formFields.description]: new FormControl(service.description, Validators.maxLength(20)),
      [this.formFields.duration]: new FormControl(service.duration, Validators.required),
      [this.formFields.price]: new FormControl(service.price, Validators.required),
      [this.formFields.paymentMethods]: new FormControl(service.price.payment_methods, Validators.required),
    });
  }
}
