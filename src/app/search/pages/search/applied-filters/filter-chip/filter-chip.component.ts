import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  public onDelete(): void {
    this.delete.emit();
  }
}
