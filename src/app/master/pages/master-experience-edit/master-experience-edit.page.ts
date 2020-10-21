import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {Experience} from '@app/master/models/experience';
import {ExperienceApiService} from '@app/master/services/experience-api.service';
import {AbstractModelEditPage} from '@app/shared/abstract/abstract-model-edit-page';

@Component({
    selector: 'app-master-experience-edit',
    templateUrl: './master-experience-edit.page.html',
    styleUrls: ['./master-experience-edit.page.scss']
})
export class MasterExperienceEditPage extends AbstractModelEditPage<Experience> {

    constructor(
        protected readonly experienceApi: ExperienceApiService,
        protected readonly route: ActivatedRoute,
        protected readonly masterManager: MasterManagerService,
        protected readonly location: Location
    ) {
        super(route, experienceApi, masterManager);
    }

    protected afterApiCallback(): void {
        this.location.back();
    }

    protected getItemId(): number {
        return parseInt(this.route.snapshot.paramMap.get('experience-id'), 10);
    }

    protected getNewModel(): Experience {
        return new Experience();
    }

    protected isUserOnly(): boolean {
        return false;
    }
}
