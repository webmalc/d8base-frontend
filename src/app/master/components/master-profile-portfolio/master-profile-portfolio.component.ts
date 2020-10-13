import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MasterPhoto} from '@app/master/models/master-photo';
import {MasterPhotosGeneratorFactoryService} from '@app/master/services/master-photos-generator-factory.service';
import {Reinitable} from '@app/shared/abstract/reinitable';

@Component({
    selector: 'app-master-profile-portfolio',
    templateUrl: './master-profile-portfolio.component.html',
    styleUrls: ['./master-profile-portfolio.component.scss'],
})
export class MasterProfilePortfolioComponent extends Reinitable {

    public masterPhotos: MasterPhoto[];
    private masterId: number;

    constructor(
        private route: ActivatedRoute,
        private masterPhotosGenerator: MasterPhotosGeneratorFactoryService
    ) {
        super();
    }

    public init(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('master-id'), 10);
        this.masterPhotosGenerator.getPhotos(this.masterId).subscribe(
            list => this.masterPhotos = list
        );
    }
}
