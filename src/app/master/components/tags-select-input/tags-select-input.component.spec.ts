import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Injectable} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {ApiListResponseInterface} from '../../../core/interfaces/api-list-response.interface';
import {Tag} from '../../models/tag';
import {TagsApiService} from '../../services/tags-api.service';
import {TagsSelectInputComponent} from './tags-select-input.component';
import {ValueAccessor} from '@ionic/angular/directives/control-value-accessors/value-accessor';

describe('TagsSelectInputComponent', () => {
    let component: TagsSelectInputComponent;
    let fixture: ComponentFixture<TagsSelectInputComponent>;

    @Injectable()
    class TagsApiServiceStub extends TagsApiService {
        public getCurrentMasterTagsList(): Observable<ApiListResponseInterface<Tag>> {
          const data: ApiListResponseInterface<Tag> = {
            count: 0,
            previous: null,
            next: null,
            results: []
          };

          return of(data);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule, HttpClientTestingModule, ReactiveFormsModule],
            declarations: [TagsSelectInputComponent],
            providers: [
                {
                    provide: TagsApiService,
                    useClass: TagsApiServiceStub
                },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TagsSelectInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

/** @see AppTestFormControlComponent  ??? Probably needs to create the wrapper fake component because this is a NG_VALUE_ACCESSOR */
    xit('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should be some tests');
});
