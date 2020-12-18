import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {CountriesApiService} from '@app/core/services';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {Country} from '@app/profile/models/country';
import {Language} from '@app/profile/models/language';
import {UserContact} from '@app/profile/models/user-contact';
import {LanguagesApiService} from '@app/profile/services/languages-api.service';
import {ProfileService} from '@app/profile/services/profile.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {UserLanguagesApiService} from '@app/profile/services/user-languages-api.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject, forkJoin, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage extends Reinitable {

    public form: FormGroup;
    public formFields = ProfileFormFields;
    public defaultLocation$: BehaviorSubject<UserLocation> = new BehaviorSubject<UserLocation>(null);
    public additionalLocationsList$: BehaviorSubject<UserLocation[]> = new BehaviorSubject<UserLocation[]>([]);
    public user: User;
    public contacts: UserContact[] = [];
    public nationality: Country | null;
    public languages: Language[];

    constructor(
        public readonly profileService: ProfileService,
        private readonly userManager: UserManagerService,
        private readonly contactsApi: UserContactApiService,
        private readonly countriesApi: CountriesApiService,
        private readonly userLanguagesApi: UserLanguagesApiService,
        private readonly languagesApi: LanguagesApiService
    ) {
        super();
    }

    public saveAvatar(data: string): void {
        if (data.slice(0, 7) !== 'http://' || data.slice(0, 8) !== 'https://') {
            this.profileService.updateUser({avatar: data});
        }
    }

    public getAvatar(): string {
        return this.profileService.avatarForm.get(ProfileFormFields.Avatar).value;
    }

    protected init(): void {
        this.profileService.createProfileForm$().subscribe(
            form => this.form = form
        );
        this.userManager.getCurrentUser().pipe(
            switchMap(user => forkJoin({
                user: of(user),
                languages: this.userLanguagesApi.getList(user.languages.map(x => x.id)).pipe(
                    switchMap(userLanguages => this.languagesApi.getList(userLanguages.map(lang => lang?.language)))
                ),
                nationality: user.nationality ? this.countriesApi.getByEntityId(user.nationality) : of(null)
            }))
        ).subscribe(
            ({user, languages, nationality}) => {
                this.user = user;
                this.languages = languages;
                this.nationality = nationality;
            }
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
        this.contactsApi.get().subscribe(
            list => this.contacts = list.results
        );
    }

    private onAvatarChange(): void {
        this.profileService.avatarForm.get(ProfileFormFields.Avatar).statusChanges.subscribe(
            _ => this.saveAvatar(this.profileService.avatarForm.get(ProfileFormFields.Avatar).value)
        );
    }

}
