import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-duration-viewer',
    templateUrl: './duration-viewer.component.html',
    styleUrls: ['./duration-viewer.component.scss'],
})
export class DurationViewerComponent {

    @Input() public duration: number;
}
