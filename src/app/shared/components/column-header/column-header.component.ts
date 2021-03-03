import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
})
export class ColumnHeaderComponent {
  @Input() public previousLocationFallback: string = '/';
  private isNeedToUseFallback: boolean;

  constructor(private readonly location: Location, private readonly router: Router) {
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
