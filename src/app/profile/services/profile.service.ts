import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '@app/core/models/user';
import {LocationService} from '@app/core/services/location.service';
import {UserLocationApiService} from '@app/core/services/location/user-location-api.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {ProfileFormService} from '@app/profile/forms/profile-form.service';
import {Language} from '@app/profile/models/language';
import {LanguagesApiService} from '@app/profile/services/languages-api.service';
import {ClientLocationInterface} from '@app/shared/interfaces/client-location-interface';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class ProfileService {

    public form: FormGroup;
    public avatarForm: FormGroup;
    private readonly languages$: BehaviorSubject<Language[]>;

    constructor(
        private readonly userManager: UserManagerService,
        private readonly formService: ProfileFormService,
        private readonly languagesApi: LanguagesApiService,
        private readonly formBuilder: FormBuilder,
        private readonly locationService: LocationService,
        private readonly userLocationApi: UserLocationApiService
    ) {
    }

    public initLocation(): Observable<ClientLocationInterface[]> {
        return this.locationService.getList(this.userLocationApi).pipe(
            map(locationList => {
                locationList.sort((a, b) => {
                    if (a.is_default) {
                        return 1;
                    }
                    if (b.is_default) {
                        return -1;
                    }
                });

                return locationList;
            })
        );
    }

    public createAvatarForm(): Observable<void> {
        return this.getUser$().pipe(
            map(
                user => {
                    this.avatarForm = this.formBuilder.group({
                        [ProfileFormFields.Avatar]: [user.avatar, [Validators.required]]
                    });
                }
            )
        );
    }

    public createProfileForm$(): Observable<FormGroup> {
        return this.getUser$().pipe(
            switchMap(user => {
                this.form = this.formService.createForm(user);

                return of<FormGroup>(this.form);
            })
        );
    }

    public getLanguages$(): Observable<Language[]> {
        if (this.languages$) {
            return this.languages$;
        }

        return this.languagesApi.getLanguages$();
    }

    public updateUser(user: Partial<User>): void {
        this.userManager.updateUser(user).pipe().subscribe(
            (updatedUser: User) => console.log(updatedUser),
            (error) => console.log(error.error)
        );
    }

    private getUser$(): Observable<User> {
        return this.userManager.getCurrentUser();
    }
}
