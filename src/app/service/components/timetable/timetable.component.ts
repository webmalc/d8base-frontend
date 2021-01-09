import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {AbstractSchedule} from '@app/core/models/abstract-schedule';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';

@Component({
    selector: 'app-timetable',
    templateUrl: './timetable.component.html',
    styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent {

    private readonly STEP = 6;

    constructor(
        public servicePublishDataHolderService: ServicePublishDataHolderService,
        public location: Location,
    ) {
    }

    public async saveTimetable(timetable: AbstractSchedule[]): Promise<void> {
        await this.servicePublishDataHolderService.assignStepData(
            this.STEP,
            {timetable},
        );
        this.location.back();
    }
}
