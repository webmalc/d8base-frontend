import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-flashbag',
  templateUrl: './success-flashbag.component.html',
  styleUrls: ['./success-flashbag.component.scss'],
})
export class SuccessFlashbagComponent {
  @Input() public messages: string[];
}
