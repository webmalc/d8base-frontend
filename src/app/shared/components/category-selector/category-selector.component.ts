import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '@app/api/models';
import { ProfessionalsService } from '@app/api/services';
import { map } from 'rxjs/operators';
import { ItemSelectorControl } from '../../location-editor/item-selector-control';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySelectorComponent),
      multi: true,
    },
  ],
})
export class CategorySelectorComponent extends ItemSelectorControl<Category> {
  public items$ = this.professionalsService.professionalsCategoriesList({}).pipe(map(response => response.results));
  @Input() public title = 'category';
  @Input() public required = false;
  @Input() public itemClass: string;
  @Input() public isMultiple: boolean = false;
  constructor(private readonly professionalsService: ProfessionalsService) {
    super();
  }
}
