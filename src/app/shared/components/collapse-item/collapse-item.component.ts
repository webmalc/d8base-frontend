import { Component, Input } from '@angular/core';

/**
 *  note that inner collapse html cannot contain ion-content tag
 */
@Component({
  selector: 'app-collapse-item',
  templateUrl: './collapse-item.component.html',
  styleUrls: ['./collapse-item.component.scss'],
})
export class CollapseItemComponent {
  @Input() public title: string;
  @Input() public noSidePadding: boolean = false;
  @Input() public titleBold: boolean = true;
  @Input() public collapsed: boolean = true;
  public readonly arrowUp = 'chevron-up-outline';
  public readonly arrowDown = 'chevron-down-outline';
  @Input() public onClickFunc: () => void = () => void 0;

  public collapse(): void {
    this.collapsed = !this.collapsed;
    this.onClickFunc();
  }
}
