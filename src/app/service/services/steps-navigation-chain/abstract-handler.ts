import {Handler} from '@app/service/interfaces/handler';

export abstract class AbstractHandler implements Handler {

    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;

        return handler;
    }

    public handle(): number {
        if (this.nextHandler) {
            return this.nextHandler.handle();
        }

        return this.getIndex();
    }

    protected abstract getIndex(): number;
}
