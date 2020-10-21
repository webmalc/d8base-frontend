import {Component, Input} from '@angular/core';

/**
 *  note that inner collapse html cannot contain ion-content tag
 */
@Component({
    selector: 'app-collapse-item',
    templateUrl: './collapse-item.component.html',
    styleUrls: ['./collapse-item.component.scss']
})
export class CollapseItemComponent {

    @Input() public title: string;
    public readonly arrowUp = 'arrow-up-circle-outline';
    public readonly arrowDown = 'arrow-down-circle-outline';
    public collapsed: boolean = true;
    // tslint:disable-next-line:no-empty
    @Input() public onClickFunc = () => {};

    public collapse(): void {
        this.collapsed = !this.collapsed;
    }
}
