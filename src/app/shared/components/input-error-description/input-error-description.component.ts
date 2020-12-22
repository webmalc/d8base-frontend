import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-input-error-description',
    templateUrl: './input-error-description.component.html',
    styleUrls: ['./input-error-description.component.scss']
})
export class InputErrorDescriptionComponent {
    @Input() public text: string;
}
