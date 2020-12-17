import {Component, OnInit} from '@angular/core';
import {City} from '@app/profile/models/city';
import {IonItem, NavParams, PopoverController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-city-picker-popover',
    templateUrl: './city-picker-popover.component.html',
    styleUrls: ['./city-picker-popover.component.scss']
})
export class CityPickerPopoverComponent implements OnInit {

    public list$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);

    constructor(
        private readonly navParams: NavParams,
        private readonly pop: PopoverController
    ) {
    }

    public ngOnInit(): void {
        this.list$.next(this.navParams.get<City[]>('data'));
    }

    public onCitySelect(event: any): void {
        const item: IonItem = event.target;
        this.pop.dismiss(JSON.parse((item as any).getAttribute('city'))).catch(err => console.error(err));
    }

    public toStr(obj: object): string {
        return JSON.stringify(obj);
    }
}
