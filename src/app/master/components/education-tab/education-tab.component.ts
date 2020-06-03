import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Education} from '@app/master/models/education';
import {EducationApiService} from '@app/master/services/education-api.service';

@Component({
    selector: 'app-education-tab',
    templateUrl: './education-tab.component.html',
    styleUrls: ['./education-tab.component.scss'],
})
export class EducationTabComponent implements OnInit {

    public masterId: number;

    constructor(
        public api: EducationApiService,
        private route: ActivatedRoute
    ) {
    }

    public getNewItem(): Education {
        return new Education();
    }

    public getPreparedEducation(): (data: Education) => Education {
        return (data: Education) => {
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

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }
}
