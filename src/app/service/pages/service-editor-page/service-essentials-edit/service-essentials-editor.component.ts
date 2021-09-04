import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Price, Service } from '@app/api/models';
import { isFormInvalid } from '@app/core/functions/form.functions';
import * as AppValidators from '@app/core/validators';
import { ColumnHeaderComponent } from '@app/shared/components';
import { ServiceEditor } from '../service-editor';
import ServiceEditorContext from '../service-editor-context.interface';
import { ServiceEditorDepsService } from '../service-editor-deps.service';

@Component({
  selector: 'app-service-essentials-edit',
  templateUrl: './service-essentials-editor.component.html',
  styleUrls: ['./service-essentials-editor.component.scss'],
})
export class ServiceEssentialsEditorComponent extends ServiceEditor {
  public formFields = {
    name: 'name',
    duration: 'duration',
    price: 'price',
    paymentMethods: 'paymentMethods',
  };

  @ViewChild(ColumnHeaderComponent)
  protected header: ColumnHeaderComponent;

  constructor(route: ActivatedRoute, deps: ServiceEditorDepsService) {
    super(route, deps);
  }

  public submit({ form, service }: ServiceEditorContext): void {
    if (isFormInvalid(form)) {
      return;
    }
    const { name, description, duration, price, paymentMethods } = form.value;
    const newPrice: Price = {
      ...service.price,
      ...price,
      payment_methods: paymentMethods,
    };
    const newService: Service = {
      ...service,
      name,
      description,
      duration,
    };
    const sources = [
      this.deps.api.accountsServicePricesUpdate({ id: newPrice.id, data: newPrice }),
      this.deps.api.accountsServicesUpdate({ id: service.id, data: newService }),
    ];
    this.saveAndReturn(sources);
  }

  protected createForm(service: Service): FormGroup {
    return new FormGroup({
      [this.formFields.name]: new FormControl(service.name, [Validators.required, AppValidators.serviceNameValidator]),
      [this.formFields.duration]: new FormControl(service.duration, Validators.required),
      [this.formFields.price]: new FormControl(service.price, AppValidators.priceIntervalValidator),
      [this.formFields.paymentMethods]: new FormControl(service.price.payment_methods),
    });
  }
}
