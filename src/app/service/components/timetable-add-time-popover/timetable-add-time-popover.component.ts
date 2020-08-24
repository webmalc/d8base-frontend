import {Component, OnInit} from '@angular/core';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-timetable-add-time-popover',
    templateUrl: './timetable-add-time-popover.component.html',
    styleUrls: ['./timetable-add-time-popover.component.scss'],
})
export class TimetableAddTimePopoverComponent extends Reinitable implements OnInit {

    public static day$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public defaultWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    constructor() {
        super();
    }

    public ngOnInit(): void {
        TimetableAddTimePopoverComponent.day$.next(null);
    }

    public onDayClick(index: number): void {
        TimetableAddTimePopoverComponent.day$.next(index);
    }
}