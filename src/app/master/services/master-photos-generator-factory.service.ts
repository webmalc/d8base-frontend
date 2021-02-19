import { Injectable } from '@angular/core';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { ProfessionalsService } from '@app/api/services';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProfessionalPhotoList } from '@app/api/models';

@Injectable({
  providedIn: 'root',
})
export class MasterPhotosGeneratorFactoryService {

  constructor(
    private readonly professionalsApi: ProfessionalsService,
    private readonly masterManager: MasterManagerService,
  ) {
  }

  public getPhotos(masterId?: number): Observable<ProfessionalPhotoList[]> {
    return masterId ? this.get(masterId) : this.masterManager.getMasterList().pipe(switchMap(list => this.get(list[0].id)));
  }

  private get(masterId: number): Observable<ProfessionalPhotoList[]> {
    return this.professionalsApi.professionalsProfessionalPhotosList({ professional: masterId }).pipe(map(res => res.results));
  }
}
