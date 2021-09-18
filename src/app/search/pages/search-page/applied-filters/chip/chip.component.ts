import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Output()
  public delete = new EventEmitter<void>();

  public onDelete(): void {
    this.delete.emit();
  }
}
