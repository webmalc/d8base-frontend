import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class ServiceStepsNavigationService {

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

    constructor(private router: Router) { }

    public navigateToLastStep(): void {
        this.router.navigateByUrl(this.urls[7]);
    }

    public navigateToNextStep(): void {
        const stepIndex = this.urls.indexOf(this.router.url) + 1;
        if (stepIndex > 7) {
            throw Error('unexpected step index');
        }
        this.router.navigateByUrl(this.urls[stepIndex]);
    }

    public navigateToPreviousStep(): void {
        const stepIndex = this.urls.indexOf(this.router.url) - 1;
        if (stepIndex < 0) {
            throw Error('unexpected step index');
        }
        this.router.navigateByUrl(this.urls[stepIndex]);
    }

    public navigateToStep(stepIndex: number): void {
        if (stepIndex < 0 || stepIndex > 7) {
            throw Error('unexpected step index');
        }
        this.router.navigateByUrl(this.urls[stepIndex]);
    }
}
