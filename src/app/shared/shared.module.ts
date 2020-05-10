import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MainGuard} from '@app/core/guards/main.guard';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {ContactsTabComponent} from '@app/shared/components/contacts-tab/contacts-tab.component';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {PictureSelectorComponent} from '@app/shared/components/picture-selector/picture-selector.component';
import {ContactsTabFormService} from '@app/shared/forms/contacts-tab-form.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {DebounceDirective} from './directives/debounce.directive';

@NgModule({
    declarations: [
        ErrorFlashbagComponent,
        PictureSelectorComponent,
        DebounceDirective,
        ContactsTabComponent
    ],
    exports: [
        ErrorFlashbagComponent,
        PictureSelectorComponent,
        DebounceDirective,
        ContactsTabComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        IonicModule,
        ReactiveFormsModule
    ],
    providers: [
        MainGuard,
        TokenManagerService,
        ContactsTabFormService
    ]
})
export class SharedModule {
}
