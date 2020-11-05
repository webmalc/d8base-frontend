import {Component, Input} from '@angular/core';
import {WizardStep} from '@app/shared/types';

@Component({
    selector: 'app-wizard-progress',
    templateUrl: './wizard-progress.component.html',
    styleUrls: ['./wizard-progress.component.scss']
})
export class WizardProgressComponent {

    @Input() public stepIndex: number;

    @Input() public steps: WizardStep[];

}
