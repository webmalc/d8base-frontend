import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReviewsApiService} from '@app/core/services/reviews-api.service';
import {IonicModule} from '@ionic/angular';
import {ReviewsTabComponent} from './reviews-tab.component';

describe('ReviewsTabComponent', () => {
    let component: ReviewsTabComponent;
    let fixture: ComponentFixture<ReviewsTabComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ReviewsTabComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule],
            providers: [ReviewsApiService]
        }).compileComponents();

        fixture = TestBed.createComponent(ReviewsTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
