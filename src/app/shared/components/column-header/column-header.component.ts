import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
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

  @Input()
  public disableBackButton: boolean = false;

  @Output()
  public beforeNavigatingBack = new EventEmitter<void>();

  constructor(private readonly navController: NavController, @Inject(WINDOW) private readonly window: Window) {}

  public navigateBack() {
    this.beforeNavigatingBack.emit();
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
