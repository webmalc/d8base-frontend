import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Service, ServicePhoto, ServiceTag } from '@app/api/models';
import { AccountsService } from '@app/api/services/accounts.service';
import { isFormInvalid } from '@app/core/functions/form.functions';
import { fileToBase64 } from '@app/core/functions/media.functions';
import { TagsManagerService } from '@app/core/services/managers';
import * as AppValidators from '@app/core/validators';
import ServiceEditorContext from '@app/service/pages/service-editor-page/service-editor-context.interface';
import { ColumnHeaderComponent } from '@app/shared/components';
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
  public tags$: Observable<ServiceTag[]>;
  public updatedTags: ServiceTag[];

  @ViewChild(ColumnHeaderComponent)
  protected header: ColumnHeaderComponent;

  private readonly refreshPhotos$ = new Subject<void>();

  constructor(
    private readonly api: AccountsService,
    private readonly tagsManager: TagsManagerService,
    route: ActivatedRoute,
    deps: ServiceEditorDepsService,
  ) {
    super(route, deps);
    this.photos$ = this.context$.pipe(
      take(1),
      repeatWhen(() => this.refreshPhotos$),
      switchMap(({ service }) => this.api.accountsServicePhotosList({ service: service.id })),
      map(response => response.results),
    );
    this.tags$ = tagsManager.tags$;
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

  public getServiceTags(serviceId: number): Observable<ServiceTag[]> {
    return this.tagsManager.getServiceTags(serviceId);
  }

  public updateTags(tags: ServiceTag[]) {
    this.updatedTags = tags;
  }

  public submit({ form, service }: ServiceEditorContext): void {
    if (isFormInvalid(form)) {
      return;
    }

    const { description } = form.value;
    const newService: Service = {
      ...service,
      description,
    };
    const sources = [
      // TODO update pictures on submit
      this.deps.api.accountsServicesUpdate({ id: service.id, data: newService }),
      this.tagsManager.updateTags(service.id, this.updatedTags),
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
