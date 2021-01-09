import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { TagsSelectInputComponent } from '../../components/tags-select-input/tags-select-input.component';
import { TagsListApiService } from '../../services/tags-list-api.service';
import { MasterTagEditPage } from './master-tag-edit.page';

describe('MasterTagEditPage', () => {
    let component: MasterTagEditPage;
    let fixture: ComponentFixture<MasterTagEditPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MasterTagEditPage, TagsSelectInputComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [
                { provide: StorageManagerService, useClass: StorageManagerMock},
                TagsListApiService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MasterTagEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
