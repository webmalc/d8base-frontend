import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-icon-wrapper',
  templateUrl: './category-icon-wrapper.component.html',
  styleUrls: ['./category-icon-wrapper.component.scss'],
})
export class CategoryIconWrapperComponent {
  @Input() public text: string;
}
