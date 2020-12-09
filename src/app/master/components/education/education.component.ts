import {Component, Input} from '@angular/core';
import {Education} from '@app/master/models/education';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.scss']
})
export class EducationComponent {
    @Input() public education: Education;
    @Input() public editable: boolean = false;
}
