import {Component, Input} from '@angular/core';

@Component({
    selector: 'error-flashbag',
    templateUrl: './error-flashbag.component.html',
    styleUrls: ['./error-flashbag.component.scss']
})
export class ErrorFlashbagComponent {

    @Input() public messages: string[];
}
