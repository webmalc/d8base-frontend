import { Component } from '@angular/core';
import {Experience} from '@app/master/models/experience';
import {AbstractListItemComponent} from '@app/shared/components/abstract-list-item/abstract-list-item.component';

@Component({
    selector: 'app-experience-item',
    templateUrl: './experience-item.component.html',
    styleUrls: ['./experience-item.component.scss'],
})
export class ExperienceItemComponent extends AbstractListItemComponent<Experience> {
    constructor() {
        super();
    }
}
