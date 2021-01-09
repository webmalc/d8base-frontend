import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Experience } from '@app/master/models/experience';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { plainToClass } from 'class-transformer';
import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
    let component: ExperienceComponent;
    let fixture: ComponentFixture<ExperienceComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ExperienceComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(ExperienceComponent);
        component = fixture.componentInstance;
        component.exp = plainToClass(Experience, {
            id: 1,
            professional: 1,
            title: 'test',
            company: 'test',
            is_still_here: true,
            description: 'test',
            start_date: '2010-01-01',
        });
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
