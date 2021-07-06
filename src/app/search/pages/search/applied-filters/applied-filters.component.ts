import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from '@app/api/services';

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.scss'],
})
export class AppliedFiltersComponent {
  @Output()
  public deleteFilter = new EventEmitter<string>();
  private _filters: { name: string; value: any }[];

  @Input()
  public set params(params: SearchService.SearchListParams) {
    this._filters = Object.entries(params ?? {})
      .map(f => ({ name: f[0], value: f[1] }))
      .filter(f => !!f.value);
  }

  public get filters(): any[] {
    return this._filters;
  }

  public delete(key: string): void {
    this.deleteFilter.emit(key);
  }
}
