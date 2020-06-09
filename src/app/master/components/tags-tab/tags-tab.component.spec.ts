import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TagsListApiService} from '../../services/tags-list-api.service';
import {TagsSelectInputComponent} from '../tags-select-input/tags-select-input.component';
import { TagsTabComponent } from './tags-tab.component';

describe('TagsTabComponent', () => {
  let component: TagsTabComponent;
  let fixture: ComponentFixture<TagsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ TagsTabComponent, TagsSelectInputComponent ],
      providers: [TagsListApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(TagsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
