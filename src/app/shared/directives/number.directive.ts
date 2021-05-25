import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
})
export class NumberDirective {
  private readonly regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*)?$/g);
  private readonly specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private readonly el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value || '';
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
