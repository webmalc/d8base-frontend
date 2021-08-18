import { Component, Input } from '@angular/core';
import { UserExtended } from '@app/api/models';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input()
  public set user(user: UserExtended) {
    this.src = user?.avatar_thumbnail ?? '';
    this.initials = user?.first_name[0];
  }

  public src: string = '';

  public initials: string = '';
}
