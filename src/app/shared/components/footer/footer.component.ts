import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    constructor(public readonly platform: Platform) {
    }
}
