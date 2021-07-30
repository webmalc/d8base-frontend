import { Component, Input } from '@angular/core';
import { ReducedUser } from '@app/api/models';
import { getNoAvatarLink } from '@app/core/functions/media.functions';

@Component({
  selector: 'app-client-widget',
  templateUrl: './client-widget.component.html',
  styleUrls: ['./client-widget.component.scss'],
})
export class ClientWidgetComponent {
  @Input() public client: ReducedUser;

  public defaultAvatar = getNoAvatarLink();
}
