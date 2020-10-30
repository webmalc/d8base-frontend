import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule, Platform} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IssuancePage} from './issuance.page';
import {SearchService} from './services/search.service';

describe('IssuancePage', () => {
    let component: IssuancePage;
    let fixture: ComponentFixture<IssuancePage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IssuancePage],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [
                SearchService,
                {provide: Platform, useValue: {width: () => 1000}}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(IssuancePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
