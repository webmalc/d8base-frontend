import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'error-flashbag',
    templateUrl: './error-flashbag.component.html',
    styleUrls: ['./error-flashbag.component.scss'],
})
export class ErrorFlashbagComponent implements OnInit {

    @Input() private message: string;

    constructor() {
    }

    ngOnInit() {
    }

    public isVisible(): boolean {
        return undefined !== this.message && 0 !== this.message.length;
    }
}
