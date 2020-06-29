import {Component, OnInit, SecurityContext} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {GridSizesInterface} from '@app/core/interfaces/grid-sizes-interface';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {MediaIconFactoryService} from '@app/core/services/media-icon-factory.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {UserContactEditComponent} from '@app/profile/components/user-contact-edit/user-contact-edit.component';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {UserContact} from '@app/profile/models/user-contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {ProfileService} from '@app/profile/services/profile.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {BehaviorSubject, forkJoin} from 'rxjs';

@Component({
    selector: 'app-main-info-tab',
    templateUrl: './main-info-tab.component.html',
    styleUrls: ['./main-info-tab.component.scss'],
})
export class MainInfoTabComponent implements OnInit {

    public form: FormGroup;
    public formFields = ProfileFormFields;
    public userContacts$: BehaviorSubject<UserContact[]> = new BehaviorSubject<UserContact[]>([]);
    public canAddNewContact$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public defaultLocation$: BehaviorSubject<UserLocation> = new BehaviorSubject<UserLocation>(null);
    public additionalLocationsList$: BehaviorSubject<UserLocation[]> = new BehaviorSubject<UserLocation[]>([]);
    public user: User;
    public sizes: GridSizesInterface = {
        sizeXs: 12,
        sizeSm: 12,
        sizeMd: 12,
        sizeLg: 12,
        sizeXl: 12
    };

    constructor(
        public profileService: ProfileService,
        private sanitizer: DomSanitizer,
        public userContactApiService: UserContactApiService,
        private contactsApi: ContactApiService,
        private userManager: UserManagerService
    ) {
    }

    public ngOnInit(): void {
        this.profileService.createProfileForm$().subscribe(
            form => this.form = form
        );
        this.userContactApiService.getCurrentClientContacts().subscribe(
            contacts => this.userContacts$.next(contacts.results)
        );
        this.canAddNewContact();
        this.userManager.getCurrentUser().subscribe(
            user => this.user = user
        );
        this.profileService.createAvatarForm();
        this.profileService.initLocation().subscribe(
            locationList => {
                this.defaultLocation$.next(locationList.pop() as UserLocation);
                this.additionalLocationsList$.next(locationList as UserLocation[]);
            }
        );
    }

    public getContactIcon(contactDisplay: string): string {
        return MediaIconFactoryService.getIcon(contactDisplay);
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
        if (data.slice(0, 7) !== 'http://' && data.slice(0, 8) !== 'https://') {
            this.profileService.updateUser({avatar: data});
        }
    }

    public getAvatar(): string | SafeResourceUrl {
        const avatar = this.profileService.avatarForm.get(ProfileFormFields.Avatar).value;
        if (null === avatar) {
            return 'assets/images/profile/noavatar.jpeg';
        }
        this.saveAvatar(avatar);

        return this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(avatar)
        );
    }

    private canAddNewContact(): void {
        forkJoin({
            contacts: this.contactsApi.get(),
            userContacts: this.userContactApiService.getCurrentClientContacts()
        }).subscribe(
            ({contacts, userContacts}) => {
                if (UserContactEditComponent.calculateContacts(contacts.results, userContacts.results).length === 0) {
                    this.canAddNewContact$.next(false);
                }
            }
        );
    }
}
