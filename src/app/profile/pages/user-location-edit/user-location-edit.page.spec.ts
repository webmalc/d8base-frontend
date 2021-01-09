import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {UserLocationEditPage} from './user-location-edit.page';

describe('UserLocationEditPage', () => {
    let component: UserLocationEditPage;
    let fixture: ComponentFixture<UserLocationEditPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [UserLocationEditPage],
            imports: [IonicModule.forRoot(), HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: {
                                get(): string {
                                    return '';
                                },
                            },
                        },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserLocationEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
