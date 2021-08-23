import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalEducation } from '@app/api/models/professional-education';
import { AccountsService } from '@app/api/services/accounts.service';
import { NavParams } from '@app/core/constants/navigation.constants';
import { MasterManagerService } from '@app/core/services';
import { ColumnHeaderComponent } from '@app/shared/components';

@Component({
  selector: 'app-master-education-edit',
  templateUrl: './master-education-edit.page.html',
  styleUrls: ['./master-education-edit.page.scss'],
})
export class MasterEducationEditPage implements OnInit {
  @ViewChild(ColumnHeaderComponent)
  public header: ColumnHeaderComponent;

  public education: ProfessionalEducation;

  constructor(
    private readonly api: AccountsService,
    private readonly route: ActivatedRoute,
    private readonly masterManager: MasterManagerService,
  ) {}

  public ngOnInit(): void {
    const educationId = parseInt(this.route.snapshot.paramMap.get(NavParams.EducationId), 10);
    if (educationId) {
      this.api.accountsProfessionalEducationsRead(educationId).subscribe(education => {
        this.education = education;
      });
    } else {
      this.masterManager.getMasterList().subscribe(
        professionals =>
          (this.education = {
            university: '',
            professional: professionals[0].id,
          }),
      );
    }
  }

  public save(data: ProfessionalEducation): void {
    const id = this.education.id;
    const saveCommand = id
      ? this.api.accountsProfessionalEducationsUpdate({ id, data })
      : this.api.accountsProfessionalEducationsCreate(data);
    saveCommand.subscribe(() => this.header.navigateBack());
  }

  public delete(id: number): void {
    this.api.accountsProfessionalEducationsDelete(id).subscribe(() => this.header.navigateBack());
  }
}
