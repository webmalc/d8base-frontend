import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '@app/api/services';

@Component({
  selector: 'app-filter-chip',
  templateUrl: './filter-chip.component.html',
  styleUrls: ['./filter-chip.component.scss'],
})
export class FilterChipComponent {
  @Input()
  public filter: any;

  @Output()
  public delete = new EventEmitter<void>();

  public fields: { [key in keyof SearchService.SearchListParams]: keyof SearchService.SearchListParams } = {
    country: 'country',
    city: 'city',
    categories: 'categories',
    subcategories: 'subcategories',
    onlyWithAutoOrderConfirmation: 'onlyWithAutoOrderConfirmation',
    startDatetime: 'startDatetime',
    endDatetime: 'endDatetime',
    serviceTypes: 'serviceTypes',
    startPrice: 'startPrice',
    endPrice: 'endPrice',
    priceCurrency: 'priceCurrency',
  };

  public onDelete(): void {
    this.delete.emit();
  }
}
