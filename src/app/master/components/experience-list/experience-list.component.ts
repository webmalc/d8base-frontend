import {Component, Input, OnInit} from '@angular/core';
import {Experience} from '@app/master/models/experience';
import {ExperienceApiService} from '@app/master/services/experience-api.service';
import {AbstractListComponent} from '@app/shared/components/abstract-list/abstract-list.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-experience-list',
    templateUrl: './experience-list.component.html',
    styleUrls: ['./experience-list.component.scss'],
})
export class ExperienceListComponent extends AbstractListComponent<Experience> implements OnInit {

    @Input() public masterId: number;

    constructor(public api: ExperienceApiService) {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    protected getItems(): Observable<Experience[]> {
        return this.api.get(this.masterId).pipe(
            map(raw => raw.results)
        );
    }
}
