import { Component, Input } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import { getProfessionalName } from '@app/core/functions/professional.functions';

@Component({
  selector: 'app-professional-card-large',
  templateUrl: './professional-card-large.component.html',
  styleUrls: ['./professional-card-large.component.scss'],
})
export class ProfessionalCardLargeComponent {
  @Input() public professional: ProfessionalList;

  public get professionalUserName(): string {
    return getProfessionalName(this.professional);
  }
}
