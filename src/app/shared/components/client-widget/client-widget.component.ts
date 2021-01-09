import { Component, Input } from '@angular/core';
import { User } from '@app/core/models/user';
import { HelperService } from '@app/core/services/helper.service';

@Component({
  selector: 'app-client-widget',
  templateUrl: './client-widget.component.html',
  styleUrls: ['./client-widget.component.scss'],
})
export class ClientWidgetComponent {

  @Input() public client: User;

  public defaultAvatar = HelperService.getNoAvatarLink();
}
