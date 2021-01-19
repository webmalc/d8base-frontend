import { Component } from '@angular/core';
import { ProfessionalPhotoList } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import MasterProfileContext from '@app/master/interfaces/master-profile-context.interface';
import { MasterProfileContextService } from '@app/master/services/master-profile-context.service';
import { Observable } from 'rxjs';
import { map, single, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-portfolio',
  templateUrl: './master-profile-portfolio.component.html',
  styleUrls: ['./master-profile-portfolio.component.scss'],
})
export class MasterProfilePortfolioComponent {
  public context$: Observable<MasterProfileContext>;
  public masterPhotos$: Observable<ProfessionalPhotoList[]>;

  constructor(contextService: MasterProfileContextService, professionalsService: ProfessionalsService) {
    this.context$ = contextService.context$;
    this.masterPhotos$ = contextService.context$.pipe(
      single(context => !!context.master),
      switchMap(context => professionalsService.professionalsProfessionalPhotosList({ professional: `${context.master.id}` })),
      map(data => data.results),
    );
  }
}
