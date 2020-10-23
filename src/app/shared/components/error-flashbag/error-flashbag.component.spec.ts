import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';
import {ErrorFlashbagComponent} from './error-flashbag.component';


describe('ErrorFlashbagComponent', () => {
    let component: ErrorFlashbagComponent;
    let fixture: ComponentFixture<ErrorFlashbagComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorFlashbagComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorFlashbagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('test input', () => {
        (component as any).message = 'test';

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('div').innerText).toEqual('test');
    });
});
