import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { HintPopoverComponent } from '@app/shared/components/hint-popover/hint-popover.component';
import { PopoverController } from '@ionic/angular';

@Directive({
  selector: '[appHint]',
})
export class HintDirective {
  @Input() public hint: string;

  constructor(private readonly element: ElementRef, private readonly popoverController: PopoverController) {}

  @HostListener('click', ['$event'])
  public async onClick(event: MouseEvent): Promise<void> {
    const popover = await this.popoverController.create({
      component: HintPopoverComponent,
      animated: true,
      showBackdrop: false,
      componentProps: {
        hint: this.hint,
      },
      cssClass: 'popover-medium',
      mode: 'ios', // shows bubble with arrow
      event, // positions the bubble
    });
    await popover.present();
  }
}
