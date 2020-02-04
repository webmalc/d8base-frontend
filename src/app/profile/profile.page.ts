import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {User} from '@app/shared/models/user';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
    public form: FormGroup;

    constructor(private userManager: UserManagerService) {
    }

    ionViewWillEnter() {
        this.userManager.getUser('-LzapnrOu_3o2aFz4IRz')
            .subscribe(
                (user: User) => {
                    this.form = new FormGroup({
                        name: new FormControl(
                            user.name,
                            [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(10)
                            ]
                        ),
                        surname: new FormControl(
                            user.surname,
                            [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(10)
                            ]
                        ),
                        password: new FormControl(
                            user.password,
                            [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(10),
                            ]
                        ),
                        avatar: new FormControl(
                            user.avatar,
                            [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(10)
                            ]
                        ),
                        email: new FormControl(
                            user.email,
                            [
                                Validators.required,
                                Validators.email,
                            ]
                        ),
                        phone: new FormControl(
                            user.phone,
                            [
                                Validators.required,
                            ]
                        ),
                        country: new FormControl(
                            user.country,
                            [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(10)
                            ]
                        ),
                        city: new FormControl(
                            user.city,
                            [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(10)
                            ]
                        ),
                        postal_code: new FormControl(
                            user.postal_code,
                            [
                                Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(10)
                            ]
                        ),
                    settings: new FormGroup({
                        push: new FormControl(user.settings.push || 'true'),
                        autoLocation: new FormControl(user.settings.autoLocation || 'true'),
                        location: new FormControl(user.settings.location || 'true')
                    }),
                    });
                }
            );
    }

    submit() {
        if (this.form.valid) {
            this.userManager.updateUser(this.form.value);
        }
    }
}
