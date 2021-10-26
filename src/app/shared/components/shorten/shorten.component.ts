import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shorten',
  templateUrl: './shorten.component.html',
  styleUrls: ['./shorten.component.scss'],
})
export class ShortenComponent {

  @Input() public text: string;
  public current: number;
  private maximum: number;

  @Input()
  public set max(max: number) {
    this.maximum = max;
    this.current = max;
  }

  public isRenderMoreBtn(): boolean {
    return this.text.length > this.maximum && this.text.length > this.current;
  }

  public isRenderLessBtn(): boolean {
    return this.text.length === this.current && this.text.length > this.maximum;
  }

  public showMore(): void {
    this.current = this.text.length;
  }

  public showLess(): void {
    this.current = this.maximum;
  }
}
