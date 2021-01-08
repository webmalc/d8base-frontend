import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-photo-popover',
    templateUrl: './photo-popover.component.html',
    styleUrls: ['./photo-popover.component.scss']
})
export class PhotoPopoverComponent {
    @Input() public src: string;

    constructor(private readonly modalController: ModalController) {}

    public close(): void {
        this.modalController.dismiss();
    }
}
