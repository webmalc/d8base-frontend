import { Component, Input } from '@angular/core';
import { ProfessionalExperienceInline } from '@app/api/models';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
    @Input() public exp: ProfessionalExperienceInline;
    @Input() public editable: boolean = false;
}
