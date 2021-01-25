import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesApiService } from '@app/core/services/services-api.service';
import { ServiceEditor } from '@app/service/components/service-editor-page/service-editor';
import ServiceEditorContext from '@app/service/components/service-editor-page/service-editor-context.interface';
import { ServiceInfoEditFields } from '@app/service/components/service-editor-page/service-info-edit/service-info-edit-fields.enum';
import { Price } from '@app/service/models/price';
import { Service } from '@app/service/models/service';

@Component({
  selector: 'app-service-info-edit',
  templateUrl: './service-info-editor.component.html',
  styleUrls: ['./service-info-editor.component.scss'],
})
export class ServiceInfoEditorComponent extends ServiceEditor {
  public formFields = ServiceInfoEditFields;

  constructor(route: ActivatedRoute, router: Router, servicesApi: ServicesApiService) {
    super(route, router, servicesApi);
  }

  public createForm(service: Service): FormGroup {
    return new FormGroup({
      [this.formFields.name]: new FormControl(service.name, Validators.required),
      [this.formFields.description]: new FormControl(service.description),
      [this.formFields.duration]: new FormControl(service.duration, Validators.required),
      [this.formFields.paymentMethods]: new FormControl(service.price.payment_methods, Validators.required),
    });
  }

  public submit({ form, service }: ServiceEditorContext): void {
    const { name, description, duration, paymentMethods } = form.value;
    const price: Price = {
      ...service.price,
      payment_methods: paymentMethods,
    };
    const newService: Service = {
      ...service,
      name,
      description,
      duration,
      price,
    };
    this.saveAndReturn(newService);
  }
}
