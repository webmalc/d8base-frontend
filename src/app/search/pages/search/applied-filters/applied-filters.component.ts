import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '@app/api/services';
import { SearchFilter } from '@app/search/interfaces/search-filter.interface';

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.scss'],
})
export class AppliedFiltersComponent {
  @Output()
  public deleteFilter = new EventEmitter<string>();
  private _filters: SearchFilter[];

  @Input()
  public set params(params: SearchService.SearchListParams) {
    this._filters = Object.entries(params ?? {})
      .map(f => {
        const name = (f[0] as unknown) as SearchFilter['name'];
        const value = f[1];
        return { name, value };
      })
      .filter(f => !!f.value);
  }

  public get filters(): SearchFilter[] {
    return this._filters;
  }

  public delete(key: string): void {
    this.deleteFilter.emit(key);
  }
}
