import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalExperience } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { NavParams } from '@app/core/constants/navigation.constants';
import { MasterManagerService } from '@app/core/services/managers/master-manager.service';
import { ColumnHeaderComponent } from '@app/shared/components';

@Component({
  selector: 'app-master-experience-edit',
  templateUrl: './master-experience-edit.page.html',
  styleUrls: ['./master-experience-edit.page.scss'],
})
export class MasterExperienceEditPage implements OnInit {
  @ViewChild(ColumnHeaderComponent)
  public header: ColumnHeaderComponent;

  public experience: ProfessionalExperience;

  constructor(
    private readonly api: AccountsService,
    private readonly route: ActivatedRoute,
    private readonly masterManager: MasterManagerService,
  ) {}

  public ngOnInit(): void {
    const experienceId = parseInt(this.route.snapshot.paramMap.get(NavParams.ExperienceId), 10);
    if (experienceId) {
      this.api.accountsProfessionalExperienceRead(experienceId).subscribe(experience => {
        this.experience = experience;
      });
    } else {
      this.masterManager.getMasterList().subscribe(
        professionals =>
          (this.experience = {
            company: '',
            title: '',
            professional: professionals[0].id,
          }),
      );
    }
  }

  public save(data: ProfessionalExperience): void {
    const id = this.experience.id;
    const saveCommand = id
      ? this.api.accountsProfessionalExperienceUpdate({ id, data })
      : this.api.accountsProfessionalExperienceCreate(data);
    saveCommand.subscribe(() => this.header.navigateBack());
  }

  public delete(id: number): void {
    this.api.accountsProfessionalExperienceDelete(id).subscribe(() => this.header.navigateBack());
  }
}
