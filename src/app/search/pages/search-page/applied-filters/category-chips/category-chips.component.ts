import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toArray, toNumber } from '@app/core/functions/string.functions';

@Component({
  selector: 'app-category-chips',
  templateUrl: './category-chips.component.html',
  styleUrls: ['./category-chips.component.scss'],
})
export class CategoryChipsComponent {
  public categories: number[];
  public subcategories: number[];

  @Output()
  public delete = new EventEmitter<string>();

  @Input()
  public set categoryIds(ids: string) {
    this.categories = toArray(ids).map(toNumber);
  }

  @Input()
  public set subcategoryIds(ids: string) {
    this.subcategories = toArray(ids).map(toNumber);
  }

  public onDelete(id: number): void {
    this.delete.emit(id.toString());
  }
}
