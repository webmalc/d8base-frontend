import { Component, Inject, Input } from '@angular/core';
import { WINDOW } from '@app/core/injection-tokens';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
})
export class ColumnHeaderComponent {
  @Input()
  public transparent: boolean = false;

  @Input()
  public backButtonUrl: string;

  constructor(private readonly navController: NavController, @Inject(WINDOW) private readonly window: Window) {}

  public navigateBack() {
    if (this.canGoBack()) {
      this.navController.back();
    } else if (this.backButtonUrl) {
      this.navController.navigateBack(this.backButtonUrl);
    }
  }

  private canGoBack(): boolean {
    return this.window.history.length > 1;
  }
}
