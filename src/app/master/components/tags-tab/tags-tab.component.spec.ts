import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagsTabComponent } from './tags-tab.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TagsSelectInputComponent} from '../tags-select-input/tags-select-input.component';

describe('TagsTabComponent', () => {
  let component: TagsTabComponent;
  let fixture: ComponentFixture<TagsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ TagsTabComponent, TagsSelectInputComponent ]
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
