import {Component, Input} from '@angular/core';
import {Experience} from '@app/master/models/experience';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
    @Input() public exp: Experience;
    @Input() public editable: boolean = false;
}
