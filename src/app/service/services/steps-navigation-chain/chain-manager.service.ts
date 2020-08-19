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
import {cloneDeep} from 'lodash/fp';

@Injectable()
export class ChainManagerService {

    private chain: Handler[] = [];
    private invertedChain: Handler[] = [];
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
        this.generateInvertedChain();
    }

    public getNextPage(url: string): string {
        return this.urls[this.chain[this.urls.indexOf(url) + 1].handle()];
    }

    public getPreviousPage(url: string): string {
        return this.urls[this.invertedChain[this.urls.indexOf(url) - 1].handle()];
    }

    private generateChain(): void {
        this.stepOneHandler.setNext(this.stepTwoHandler).setNext(this.stepThreeHandler).setNext(this.stepFourHandler)
            .setNext(this.stepFiveHandler).setNext(this.stepSixHandler).setNext(this.stepSevenHandler).setNext(this.finalStepHandler);
        this.chain = [
            cloneDeep<Handler>(this.stepOneHandler),
            cloneDeep<Handler>(this.stepTwoHandler),
            cloneDeep<Handler>(this.stepThreeHandler),
            cloneDeep<Handler>(this.stepFourHandler),
            cloneDeep<Handler>(this.stepFiveHandler),
            cloneDeep<Handler>(this.stepSixHandler),
            cloneDeep<Handler>(this.stepSevenHandler),
            cloneDeep<Handler>(this.finalStepHandler)
        ];
    }

    private generateInvertedChain(): void {
        this.finalStepHandler.setNext(this.stepSevenHandler).setNext(this.stepSixHandler).setNext(this.stepFiveHandler)
            .setNext(this.stepFourHandler).setNext(this.stepThreeHandler).setNext(this.stepTwoHandler).setNext(this.stepOneHandler);
        this.invertedChain = [
            cloneDeep<Handler>(this.finalStepHandler),
            cloneDeep<Handler>(this.stepSevenHandler),
            cloneDeep<Handler>(this.stepSixHandler),
            cloneDeep<Handler>(this.stepFiveHandler),
            cloneDeep<Handler>(this.stepFourHandler),
            cloneDeep<Handler>(this.stepThreeHandler),
            cloneDeep<Handler>(this.stepTwoHandler),
            cloneDeep<Handler>(this.stepOneHandler)
        ];
    }
}
