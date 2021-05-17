import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-button',
  templateUrl: './chat-button.component.html',
})
export class ChatButtonComponent {
  @Input() public userId: number;
}
