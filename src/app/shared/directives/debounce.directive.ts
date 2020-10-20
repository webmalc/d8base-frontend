import {Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Directive({
    selector: '[appDebounce]'
})
export class DebounceDirective implements OnInit, OnDestroy {

    @Output() public debounceClick = new EventEmitter();
    private readonly clicks = new Subject();
    private subscription: Subscription;

    public ngOnInit(): void {
        this.subscription = this.clicks
            .pipe(debounceTime(150))
            .subscribe(e => this.debounceClick.emit(e));
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    @HostListener('click', ['$event'])
    public clickEvent(event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}
