import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InboxComponent } from './inbox.component';

describe('InboxComponent', () => {
    let component: InboxComponent;
    let fixture: ComponentFixture<InboxComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [InboxComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(InboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
