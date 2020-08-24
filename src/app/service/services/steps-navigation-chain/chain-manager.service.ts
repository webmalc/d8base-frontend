import {Injectable} from '@angular/core';
import {Handler} from '@app/service/interfaces/handler';
import {StepFinalHandlerService} from '@app/service/services/steps-navigation-chain/step-final-handler.service';
import {StepFiveHandlerService} from '@app/service/services/steps-navigation-chain/step-five-handler.service';
import {StepFourHandlerService} from '@app/service/services/steps-navigation-chain/step-four-handler.service';
import {StepOneHandlerService} from '@app/service/services/steps-navigation-chain/step-one-handler.service';
import {StepSevenHandlerService} from '@app/service/services/steps-navigation-chain/step-seven-handler.service';
import {StepSixHandlerService} from '@app/service/services/steps-navigation-chain/step-six-handler.service';
import {StepThreeHandlerService} from '@app/service/services/steps-navigation-chain/step-three-handler.service';
import {StepTwoHandlerService} from '@app/service/services/steps-navigation-chain/step-two-handler.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ChainManagerService {

    private chain: Handler[] = [];
    private readonly urls: string[] = [
        '/service/publish/step-one',
        '/service/publish/step-two',
        '/service/publish/step-three',
        '/service/publish/step-four',
        '/service/publish/step-five',
        '/service/publish/step-six',
        '/service/publish/step-seven',
        '/service/publish/final',
    ];

    constructor(
        private readonly stepOneHandler: StepOneHandlerService,
        private readonly stepTwoHandler: StepTwoHandlerService,
        private readonly stepThreeHandler: StepThreeHandlerService,
        private readonly stepFourHandler: StepFourHandlerService,
        private readonly stepFiveHandler: StepFiveHandlerService,
        private readonly stepSixHandler: StepSixHandlerService,
        private readonly stepSevenHandler: StepSevenHandlerService,
        private readonly finalStepHandler: StepFinalHandlerService
    ) {
        this.generateChain();
    }

    public getNextPage(url: string): Observable<string> {
        return this.chain[this.urls.indexOf(url) + 1].handleNext().pipe(
            map(index => this.urls[index])
        );
    }

    public getPreviousPage(url: string): Observable<string> {
        return this.chain[this.urls.indexOf(url) - 1].handlePrevious().pipe(
            map(index => this.urls[index])
        );
    }

    private generateChain(): void {
        this.stepOneHandler.setNext(this.stepTwoHandler).setNext(this.stepThreeHandler).setNext(this.stepFourHandler)
            .setNext(this.stepFiveHandler).setNext(this.stepSixHandler).setNext(this.stepSevenHandler).setNext(this.finalStepHandler);
        this.finalStepHandler.setPrevious(this.stepSevenHandler).setPrevious(this.stepSixHandler).setPrevious(this.stepFiveHandler)
            .setPrevious(this.stepFourHandler).setPrevious(this.stepThreeHandler).setPrevious(this.stepTwoHandler)
            .setPrevious(this.stepOneHandler);
        this.chain = [
            this.stepOneHandler,
            this.stepTwoHandler,
            this.stepThreeHandler,
            this.stepFourHandler,
            this.stepFiveHandler,
            this.stepSixHandler,
            this.stepSevenHandler,
            this.finalStepHandler
        ];
    }
}
