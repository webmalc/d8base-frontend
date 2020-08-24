import {Observable} from 'rxjs';

export interface Handler {
    setNext(handler: Handler): Handler;
    setPrevious(handler: Handler): Handler;
    handleNext(): Observable<number>;
    handlePrevious(): Observable<number>;
}
