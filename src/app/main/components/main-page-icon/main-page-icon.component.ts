import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-main-page-icon',
    templateUrl: './main-page-icon.component.html',
    styleUrls: ['./main-page-icon.component.scss'],
})
export class MainPageIconComponent {
    @Input() public text: string;
}
