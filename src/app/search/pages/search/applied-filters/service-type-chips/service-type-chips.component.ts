import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toArray } from '@app/core/functions/string.functions';

@Component({
  selector: 'app-service-type-chips',
  templateUrl: './service-type-chips.component.html',
  styleUrls: ['./service-type-chips.component.scss'],
})
export class ServiceTypeChipsComponent {
  public chips: string[];

  @Output()
  public delete = new EventEmitter<string>();

  @Input()
  public set serviceTypes(types: string) {
    this.chips = toArray(types);
  }

  public onDelete(value: string): void {
    this.delete.emit(value);
  }
}
