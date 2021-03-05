import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HelperService } from '@app/core/services/helper.service';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';

@Component({
  selector: 'app-master-profile-main-info-section',
  templateUrl: './master-profile-main-info-section.component.html',
  styleUrls: ['./master-profile-main-info-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterProfileMainInfoSectionComponent {
  @Input() public context: ProfessionalPageStateModel;

  public getAvatar(): string {
    return this.context?.user?.avatar ? this.context.user.avatar : HelperService.getNoAvatarLink();
  }
}
