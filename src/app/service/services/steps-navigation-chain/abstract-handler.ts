import { Handler } from '@app/service/interfaces/handler';
import { Observable, of } from 'rxjs';

export abstract class AbstractHandler implements Handler {

    private nextHandler: Handler;
    private previousHandler: Handler;

    public setPrevious(handler: Handler): Handler {
        this.previousHandler = handler;

        return handler;
    }

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;

        return handler;
    }

    public handlePrevious(): Observable<number> {
        if (this.previousHandler) {
            return this.previousHandler.handlePrevious();
        }

        return of(this.getIndex());
    }

    public handleNext(): Observable<number> {
        if (this.nextHandler) {
            return this.nextHandler.handleNext();
        }

        return of(this.getIndex());
    }

    protected abstract getIndex(): number;
}
