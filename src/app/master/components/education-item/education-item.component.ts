import { Component } from '@angular/core';
import {Education} from '@app/master/models/education';
import {AbstractListItemComponent} from '@app/shared/components/abstract-list-item/abstract-list-item.component';

@Component({
    selector: 'app-education-item',
    templateUrl: './education-item.component.html',
    styleUrls: ['./education-item.component.scss'],
})
export class EducationItemComponent extends AbstractListItemComponent<Education> {

    constructor() {
        super();
    }
}
