import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service, ServicePhoto } from '@app/api/models';
import { AccountsService } from '@app/api/services/accounts.service';
import * as AppValidators from '@app/core/validators';
import { fileToBase64 } from '@app/core/functions/media.functions';
import ServiceEditorContext from '@app/service/components/service-editor-page/service-editor-context.interface';
import { Observable, Subject } from 'rxjs';
import { first, map, mergeMap, repeatWhen, switchMap, take } from 'rxjs/operators';
import { ServiceEditor } from '../service-editor';
import { ServiceEditorDepsService } from '../service-editor-deps.service';

@Component({
  selector: 'app-service-details-edit',
  templateUrl: './service-details-edit.component.html',
  styleUrls: ['./service-details-edit.component.scss'],
})
export class ServiceDetailsEditComponent extends ServiceEditor {
  public photos$: Observable<ServicePhoto[]>;

  private readonly refreshPhotos$ = new Subject<void>();

  constructor(private readonly api: AccountsService, route: ActivatedRoute, deps: ServiceEditorDepsService) {
    super(route, deps);
    this.photos$ = this.context$.pipe(
      take(1),
      repeatWhen(() => this.refreshPhotos$),
      switchMap(({ service }) => this.api.accountsServicePhotosList({ service: service.id })),
      map(response => response.results),
    );
  }

  public async addPhotos(files: File[], service: Service): Promise<void> {
    const requests$ = files.map(file => this.addPhoto$(file, service.id));
    await Promise.all(requests$);
    this.refreshPhotos$.next();
  }

  public removePhoto(index: number) {
    this.photos$
      .pipe(
        first(),
        mergeMap(photos => this.api.accountsServicePhotosDelete(photos[index].id)),
      )
      .subscribe(() => this.refreshPhotos$.next());
  }

  public submit({ form, service }: ServiceEditorContext): void {
    const { description } = form.value;
    const newService: Service = {
      ...service,
      description,
    };
    const sources = [
      // TODO update pictures on submit
      this.deps.api.accountsServicesUpdate({ id: service.id, data: newService }),
    ];
    this.saveAndReturn(sources);
  }

  protected createForm(service: Service): FormGroup {
    return new FormGroup({
      description: new FormControl(service.description, AppValidators.descriptionValidator),
    });
  }

  private async addPhoto$(file: File, serviceId: number): Promise<void> {
    const photo = await fileToBase64(file);
    const servicePhoto: ServicePhoto = {
      photo,
      service: serviceId,
    };
    await this.api.accountsServicePhotosCreate(servicePhoto).toPromise();
  }
}
