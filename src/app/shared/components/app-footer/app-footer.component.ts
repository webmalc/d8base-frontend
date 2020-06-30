import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.scss'],
})
export class AppFooterComponent {
    constructor(public readonly platform: Platform) {
    }
}
