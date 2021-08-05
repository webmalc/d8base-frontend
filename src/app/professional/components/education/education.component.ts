import { Component, Input } from '@angular/core';
import { ProfessionalEducationInline } from '@app/api/models';
import { Education } from '@app/professional/models/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  @Input() public education: ProfessionalEducationInline;
  @Input() public editable: boolean = false;
}
