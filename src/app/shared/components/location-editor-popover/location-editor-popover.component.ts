import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-location-editor-popover',
  templateUrl: './location-editor-popover.component.html',
  styleUrls: ['./location-editor-popover.component.scss'],
})
export class LocationEditorPopoverComponent {

  constructor(private readonly popoverController: PopoverController) { }

  public save(data): void {
    this.popoverController.dismiss(data);
  }
}
