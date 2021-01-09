import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MasterProfileContextService } from '@app/master/services/master-profile-context.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MasterProfileInfoComponent } from './master-profile-info.component';

describe('MasterProfileInfoComponent', () => {
    let component: MasterProfileInfoComponent;
    let fixture: ComponentFixture<MasterProfileInfoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MasterProfileInfoComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [
                MasterProfileContextService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MasterProfileInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
