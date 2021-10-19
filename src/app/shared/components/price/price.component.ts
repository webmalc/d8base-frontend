import { Component, Input } from '@angular/core';
import { Price } from '@app/api/models/price';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent {
  @Input() public price: Price;
  public readonly digits = '1.0-2'; // 0..2 decimal digits
  public readonly locale = 'fr-CA'; // whitespace grouping separator
}
