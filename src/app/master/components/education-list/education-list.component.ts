import {Component, Input, OnInit} from '@angular/core';
import {Education} from '@app/master/models/education';
import {AbstractListComponent} from '@app/shared/components/abstract-list/abstract-list.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-education-list',
    templateUrl: './education-list.component.html',
    styleUrls: ['./education-list.component.scss'],
})
export class EducationListComponent extends AbstractListComponent<Education> implements OnInit {

    @Input() public masterId: number;

    constructor() {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    protected getItems(): Observable<Education[]> {
        return this.apiService.get(this.masterId).pipe(
            map(raw => raw.results)
        );
    }

}
