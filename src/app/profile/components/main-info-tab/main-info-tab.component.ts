import {Component, OnInit, SecurityContext} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {User} from '@app/core/models/user';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {Language} from '@app/profile/models/language';
import {ProfileService} from '@app/profile/services/profile.service';
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

    constructor(
        private profileService: ProfileService,
        private sanitizer: DomSanitizer
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

    public genderList(): string[] {
        return this.profileService.getGenders();
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

    public isSubmitDisabled(): boolean {
        return !(this.form.dirty && this.form.valid);
    }
}
