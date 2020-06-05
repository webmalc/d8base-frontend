import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReviewsApiService} from '../../../core/services/reviews-api.service';
import { ReviewsTabComponent } from './reviews-tab.component';

describe('ReviewsTabComponent', () => {
    let component: ReviewsTabComponent;
    let fixture: ComponentFixture<ReviewsTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ReviewsTabComponent ],
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
