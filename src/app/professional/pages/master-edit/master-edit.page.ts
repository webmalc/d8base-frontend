import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Professional } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { NavBranch, NavParams, NavPath } from '@app/core/constants/navigation.constants';
import { ColumnHeaderComponent } from '@app/shared/components';

@Component({
  selector: 'app-master-edit-page',
  templateUrl: './master-edit.page.html',
  styleUrls: ['./master-edit.page.scss'],
})
export class MasterEditPage implements OnInit {
  @ViewChild(ColumnHeaderComponent)
  public header: ColumnHeaderComponent;

  public professionalProfileUrl = `/${NavPath.Professional}/${NavBranch.MyProfile}`;
  public professional: Professional;

  constructor(protected readonly api: AccountsService, protected readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    const professionalId = parseInt(this.route.snapshot.paramMap.get(NavParams.MasterId), 10);
    if (professionalId) {
      this.api.accountsProfessionalsRead(professionalId).subscribe(professional => {
        this.professional = professional;
      });
    } else {
      this.professional = {
        name: '',
        subcategory: NaN,
      };
    }
  }

  public save(data): void {
    const id = this.professional.id;
    const saveCommand = id
      ? this.api.accountsProfessionalsUpdate({ id, data })
      : this.api.accountsProfessionalsCreate(data);
    saveCommand.subscribe(() => this.header.navigateBack());
  }
}
