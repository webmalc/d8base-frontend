import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
})
export class ColumnHeaderComponent {
  @Input() public previousLocationFallback: string = '/';
  private isNeedToUseFallback: boolean;

  constructor(private readonly location: Location, private readonly router: Router, private readonly navCtrl: NavController) {
    this.isNeedToUseFallback = !this.router.navigated;
  }

  public back(): void {
    if (this.isNeedToUseFallback) {
      this.isNeedToUseFallback = false;
      this.router.navigateByUrl(this.previousLocationFallback);
    } else {
      this.location.back();
    }
  }
}
