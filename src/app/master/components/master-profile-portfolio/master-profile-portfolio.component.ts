import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalPhotoList } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { Reinitable } from '@app/shared/abstract/reinitable';

@Component({
    selector: 'app-master-profile-portfolio',
    templateUrl: './master-profile-portfolio.component.html',
    styleUrls: ['./master-profile-portfolio.component.scss'],
})
export class MasterProfilePortfolioComponent extends Reinitable {
    public masterPhotos: ProfessionalPhotoList[];
    public masterId: string;

    constructor(private readonly route: ActivatedRoute, private readonly professionalsService: ProfessionalsService) {
        super();
    }

    public init(): void {
        this.masterId = this.route.snapshot.paramMap.get('master-id');
        this.professionalsService.professionalsProfessionalPhotosList({ professional: `${this.masterId}` }).subscribe(({ results }) => {
            this.masterPhotos = results;
        });
    }
}
