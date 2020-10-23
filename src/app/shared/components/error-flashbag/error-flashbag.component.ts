import {Component, Input} from '@angular/core';

@Component({
    selector: 'error-flashbag',
    templateUrl: './error-flashbag.component.html',
    styleUrls: ['./error-flashbag.component.scss']
})
export class ErrorFlashbagComponent {

    @Input() public message: string;

    public isVisible(): boolean {
        return undefined !== this.message && 0 !== this.message.length;
    }
}
