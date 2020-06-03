import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Experience} from '@app/master/models/experience';
import {ExperienceApiService} from '@app/master/services/experience-api.service';

@Component({
    selector: 'app-experience-tab',
    templateUrl: './experience-tab.component.html',
    styleUrls: ['./experience-tab.component.scss'],
})
export class ExperienceTabComponent implements OnInit {

    public masterId: number;

    constructor(
        public api: ExperienceApiService,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }

    public getNewItem(): Experience {
        return new Experience();
    }

    public getPreparedExperience(): (data: Experience) => Experience {
        return (data: Experience) => {
            data.professional = this.masterId;
            if (data.start_date) {
                data.start_date = data.start_date.slice(0, 10);
            }
            if (data.end_date) {
                data.end_date = data.end_date.slice(0, 10);
            }

            return data;
        };
    }
}
