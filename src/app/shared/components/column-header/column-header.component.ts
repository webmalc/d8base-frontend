import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
})
export class ColumnHeaderComponent {
  @Input()
  public previousLocationFallback: string = '/';

  @Input()
  public transparent: boolean = false;

  private useFallback: boolean;

  constructor(private readonly location: Location, private readonly router: Router) {
    this.useFallback = !this.router.navigated;
  }

  public back(): void {
    if (this.useFallback) {
      this.useFallback = false;
      this.router.navigateByUrl(this.previousLocationFallback);
    } else {
      this.location.back();
    }
  }
}
