import { Component, Input } from '@angular/core';
import { Price } from '@app/api/models/price';

@Component({
    selector: 'app-price',
    templateUrl: './price.component.html',
    styleUrls: ['./price.component.scss'],
})
export class PriceComponent {
    @Input() public price: Price;
}
