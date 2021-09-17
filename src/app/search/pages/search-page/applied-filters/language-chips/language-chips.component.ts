import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toArray } from '@app/core/functions/string.functions';

@Component({
  selector: 'app-language-chips',
  templateUrl: './language-chips.component.html',
  styleUrls: ['./language-chips.component.scss'],
})
export class LanguageChipsComponent {
  public chips: string[];

  @Output()
  public delete = new EventEmitter<string>();

  @Input()
  public set languages(languages: string) {
    this.chips = toArray(languages);
  }

  public onDelete(value: string): void {
    this.delete.emit(value);
  }
}
