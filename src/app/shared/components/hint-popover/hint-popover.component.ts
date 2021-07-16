import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hint-popover',
  templateUrl: './hint-popover.component.html',
  styleUrls: ['./hint-popover.component.scss'],
})
export class HintPopoverComponent {
  @Input() public hint: string;
}
