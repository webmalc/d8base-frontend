import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-popover',
  templateUrl: './photo-popover.component.html',
  styleUrls: ['./photo-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoPopoverComponent {
  @Input() public photos: string[];
  @Input() public photoIndex: number = 0;

  public isNextButtonDisabled$: Observable<boolean>;
  public isPrevButtonDisabled$: Observable<boolean>;

  constructor(private readonly modalController: ModalController, private readonly cd: ChangeDetectorRef) {}

  public close(): void {
    this.modalController.dismiss();
  }

  public delete(): void {
    this.modalController.dismiss({ delete: true });
  }

  public slideNext(): void {
    this.photoIndex += 1;
    this.cd.markForCheck();
  }

  public slidePrev(): void {
    this.photoIndex -= 1;
    this.cd.markForCheck();
  }
}
