import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';

/**
 * Day of the week selection popover
 */
@Component({
    selector: 'app-timetable-add-time-popover',
    templateUrl: './day-selector.component.html',
    styleUrls: ['./day-selector.component.scss']
})
export class DaySelectorComponent {

    public defaultWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    constructor(private readonly popoverController: PopoverController) {
    }

    public onDayClick(index: number): void {
        this.popoverController.dismiss(index);
    }
}
