import { AfterViewInit, Directive, ElementRef, Host, Renderer2 } from '@angular/core';
import { IonImg } from '@ionic/angular';

@Directive({
    // tslint:disable:directive-selector
    selector: 'ion-img[spinner]',
})
export class IonImageSpinnerDirective implements AfterViewInit {
    private ionImageDisplayStyle: string;
    private spinnerElement: HTMLElement | undefined;

    constructor(
        @Host() private readonly host: ElementRef<HTMLElement>,
        private readonly ionImg: IonImg,
        private readonly renderer: Renderer2,
    ) { }

    public ngAfterViewInit(): void {
        this.ionImg.ionImgWillLoad.subscribe(() => {
            this.showSpinner();
        });
        this.ionImg.ionImgDidLoad.subscribe(() => {
            this.hideSpinner();
        });
        this.ionImg.ionError.subscribe(() => {
            this.hideSpinner();
        });
    }

    private showSpinner(): void {
        this.spinnerElement = this.createSpinner();
        this.host.nativeElement.insertAdjacentElement('afterend', this.spinnerElement);
        this.ionImageDisplayStyle = this.host.nativeElement.style.display;
        this.host.nativeElement.style.display = 'none';
    }

    private hideSpinner(): void {
        this.host.nativeElement.style.display = this.ionImageDisplayStyle;
        this.spinnerElement.remove();
    }

    private createSpinner(): HTMLElement {
        const spinnerElement = this.renderer.createElement('ion-spinner');
        const styles = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            '-webkit-transform': 'translate(-50%, -50%)',
            '-ms-transform': 'translate(-50%, -50%)',
        };
        Object.keys(styles).forEach(key => {
            spinnerElement.style[key] = styles[key];
        });
        spinnerElement.setAttribute('name', 'lines');

        return spinnerElement;
    }
}
