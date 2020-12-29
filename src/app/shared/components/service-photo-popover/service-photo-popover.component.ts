import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-service-photo-popover',
    templateUrl: './service-photo-popover.component.html',
    styleUrls: ['./service-photo-popover.component.scss']
})
export class ServicePhotoPopoverComponent {
    @Input() public src: string;
    constructor(private readonly modalController: ModalController) {}

    public close(): void {
        this.modalController.dismiss();
    }
}
