import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {UserInterface} from '@app/core/interfaces/user.interface';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {ProfileService} from '@app/profile/services/profile.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {ContactsAddComponent} from '@app/shared/components/contacts-add/contacts-add.component';
import {plainToClass} from 'class-transformer';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-main-info-tab',
    templateUrl: './main-info-tab.component.html',
    styleUrls: ['./main-info-tab.component.scss'],
})
export class MainInfoTabComponent extends Reinitable {

    public form: FormGroup;
    public formFields = ProfileFormFields;
    public defaultLocation$: BehaviorSubject<UserLocation> = new BehaviorSubject<UserLocation>(null);
    public additionalLocationsList$: BehaviorSubject<UserLocation[]> = new BehaviorSubject<UserLocation[]>([]);
    public user: User;

    constructor(
        public profileService: ProfileService,
        private sanitizer: DomSanitizer,
        private userManager: UserManagerService
    ) {
        super();
    }

// TODO: Is there best way for trim input values ?
    public submit(): void {
        // const user: User = plainToClass(User, this.form.getRawValue(), {excludeExtraneousValues: true});
        // user.birthday = user.birthday.slice(0, 10);
        // if (!this.form.controls[this.formFields.Avatar].dirty) {
        //     delete user.avatar;
        // }
        // this.profileService.updateUser(user);
    }

    public saveAvatar(data: string): void {
        if (data.slice(0, 7) !== 'http://' || data.slice(0, 8) !== 'https://') {
            this.profileService.updateUser({avatar: data});
        }
    }

    public getAvatar(): string | SafeResourceUrl {
        return (plainToClass(User, this.profileService.avatarForm.getRawValue() as UserInterface) as User).getAvatar();
    }

    protected init(): void {
        this.profileService.createProfileForm$().subscribe(
            form => this.form = form
        );
        this.userManager.getCurrentUser().subscribe(
            user => this.user = user
        );
        this.profileService.createAvatarForm().subscribe(
            () => this.onAvatarChange()
        );
        this.profileService.initLocation().subscribe(
            locationList => {
                this.defaultLocation$.next(locationList.pop() as UserLocation);
                this.additionalLocationsList$.next(locationList as UserLocation[]);
            }
        );
        ContactsAddComponent.reinit$.next(true);
    }

    private onAvatarChange(): void {
        this.profileService.avatarForm.get(ProfileFormFields.Avatar).statusChanges.subscribe(
            _ => this.saveAvatar(this.profileService.avatarForm.get(ProfileFormFields.Avatar).value)
        );
    }
}
