import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import MasterProfileContext from '../interfaces/master-profile-context.interface';

@Injectable()
export class MasterProfileContextService {
    public context$: Observable<MasterProfileContext>;
    private readonly contextSubject$ = new BehaviorSubject<MasterProfileContext>({ });

    constructor() {
        this.context$ = this.contextSubject$.asObservable();
    }

    public get contextSnapshot(): MasterProfileContext {
        return this.contextSubject$.value;
    }

    public setContext(context: MasterProfileContext): void {
        this.contextSubject$.next(context);
    }
}
