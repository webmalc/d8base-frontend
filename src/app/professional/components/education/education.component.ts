import { Component, Input } from '@angular/core';
import { ProfessionalEducationInline } from '@app/api/models';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  @Input() public education: ProfessionalEducationInline;
  @Input() public editable: boolean = false;
}
