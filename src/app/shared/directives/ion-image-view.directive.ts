import { Directive, HostListener, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive({
  /* eslint-disable @angular-eslint/directive-selector */
  selector: '[viewOnClick]',
})
export class IonImageViewDirective {
  @Input() public readonly fullSizeSrc: string;
  @Input() public readonly src: string;
  private readonly clickSubject = new Subject<void>();

  @HostListener('click', ['$event'])
  private viewImage(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.clickSubject.next();
  }

  public get imageClick(): Observable<void> {
    return this.clickSubject.asObservable();
  }
}
