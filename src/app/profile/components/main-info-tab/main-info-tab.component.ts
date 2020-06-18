import {Component, OnInit, SecurityContext} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {GridSizesInterface} from '@app/core/interfaces/grid-sizes-interface';
import {User} from '@app/core/models/user';
import {SettingsTabComponent} from '@app/profile/components/settings-tab/settings-tab.component';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {Language} from '@app/profile/models/language';
import {UserContact} from '@app/profile/models/user-contact';
import {ProfileService} from '@app/profile/services/profile.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {ContactsTabComponent} from '@app/shared/components/contacts-tab/contacts-tab.component';
import {UserLocationMapComponent} from '@app/shared/components/user-location-map/user-location-map.component';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-main-info-tab',
    templateUrl: './main-info-tab.component.html',
    styleUrls: ['./main-info-tab.component.scss'],
})
export class MainInfoTabComponent implements OnInit {

    public form: FormGroup;
    public formFields = ProfileFormFields;
    public availableAddsLanguages$: BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>([]);
    public languages$: BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>([]);
    public sizes: GridSizesInterface = {
        sizeXs: 12,
        sizeSm: 12,
        sizeMd: 12,
        sizeLg: 12,
        sizeXl: 12
    };

    constructor(
        private profileService: ProfileService,
        private sanitizer: DomSanitizer,
        public userContactApiService: UserContactApiService
    ) {
    }

    public ngOnInit(): void {
        this.profileService.getLanguages$().subscribe(
            languages => this.languages$.next(languages)
        );
        this.profileService.getAvailableAdditionalLanguages$().subscribe(
            data => this.availableAddsLanguages$.next(data)
        );
        this.profileService.createProfileForm$().subscribe(
            form => {
                this.form = form;
                this.profileService.recomputeAdditionalLanguages();
            }
        );
    }

    public getNewUser(): ClientContactInterface {
        return new UserContact();
    }

    public invalidateMapSize(): void {
        UserLocationMapComponent.forceInvalidate.next(true);
    }

    public recomputeAdditionalLanguages(): void {
        this.profileService.recomputeAdditionalLanguages();
    }

// TODO: Is there best way for trim input values ?
    public submit(): void {
        const user: User = plainToClass(User, this.form.getRawValue(), {excludeExtraneousValues: true});
        user.birthday = user.birthday.slice(0, 10);
        if (!this.form.controls[this.formFields.Avatar].dirty) {
            delete user.avatar;
        }
        this.profileService.updateUser(user);
        ContactsTabComponent.submitThis.next(true);
        SettingsTabComponent.submitThis.next(true);
    }

    public getAvatar(): string | SafeResourceUrl {
        if (null === this.form.get(ProfileFormFields.Avatar).value) {
            return 'assets/images/profile/noavatar.jpeg';
        }

        return this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(this.form.get(ProfileFormFields.Avatar).value)
        );
    }
}
