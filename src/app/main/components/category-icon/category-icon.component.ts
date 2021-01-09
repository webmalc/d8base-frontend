import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-category-icon',
    templateUrl: './category-icon.component.html',
    styleUrls: ['./category-icon.component.scss'],
})
export class CategoryIconComponent {

    @Input() public size: string = '1x';
    @Input() public icon: string;
    @Input() public text: string;
}
