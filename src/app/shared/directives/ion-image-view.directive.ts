import { Directive, HostListener, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoPopoverComponent } from '../components/photo-popover/photo-popover.component';

@Directive({
    // tslint:disable:directive-selector
    selector: 'ion-img[viewOnClick]',
})
export class IonImageViewDirective {
    @Input() private readonly fullSizeSrc: string;
    @Input() private readonly src: string;

    constructor(private readonly modalController: ModalController) { }
    @HostListener('click')
    private viewImage(): void {
        this.createPopover(this.fullSizeSrc ?? this.src);
    }

    private async createPopover(src: string): Promise<void> {
        const pop = await this.modalController.create({
            component: PhotoPopoverComponent,
            cssClass: 'modal-fullscreen',
            componentProps: {
                src,
            },
        });

        return await pop.present();
    }
}
