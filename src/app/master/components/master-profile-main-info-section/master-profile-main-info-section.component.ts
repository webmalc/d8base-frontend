import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserExtended } from '@app/api/models';
import { getNoAvatarLink } from '@app/core/functions/file.functions';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';

@Component({
  selector: 'app-master-profile-main-info-section',
  templateUrl: './master-profile-main-info-section.component.html',
  styleUrls: ['./master-profile-main-info-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterProfileMainInfoSectionComponent {
  @Input() public context: ProfessionalPageStateModel;

  public getName(user: UserExtended): string {
    return user ? `${user.first_name} ${user.last_name}` : '';
  }

  public getAvatar(user: UserExtended): string {
    return user?.avatar ? user.avatar : getNoAvatarLink();
  }
}
