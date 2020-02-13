import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {User} from '@app/shared/models/user';
import {AuthenticationService} from '@app/core/services/authentication.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    public form: FormGroup;

    constructor(
        private userManager: UserManagerService,
        private authService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.authService.getUserId().subscribe(
            userId => {
                this.userManager.getUser(userId)
                    .subscribe(
                        (user: User) => {
                            this.form = new FormGroup({
                                first_name: new FormControl(
                                    user.firstName,
                                    [
                                        Validators.required,
                                        Validators.minLength(2),
                                        Validators.maxLength(10)
                                    ]
                                ),
                                last_name: new FormControl(
                                    user.lastName,
                                    [
                                        Validators.required,
                                        Validators.minLength(2),
                                        Validators.maxLength(10)
                                    ]
                                ),
                                patronymic: new FormControl(
                                    user.lastName,
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
                                avatar: new FormControl(
                                    user.avatar,
                                    [
                                        Validators.required,
                                        Validators.minLength(2),
                                        Validators.maxLength(10)
                                    ]
                                ),
                                gender: new FormControl(
                                    user.gender,
                                    [
                                        Validators.minLength(2),
                                        Validators.maxLength(10)
                                    ]
                                ),
                                age: new FormControl(
                                    user.age,
                                    [
                                        Validators.required,
                                        Validators.min(18),
                                        Validators.max(122)
                                    ]
                                ),
                                main_language: new FormControl(
                                    user.main_language,
                                    [
                                        Validators.required
                                    ]
                                ),
                                languages: new FormControl(
                                    user.languages
                                ),
                            });
                        }
                    );
            }
        );

    }

    submit() {
        if (this.form.valid) {
            console.log('submit');
            this.userManager.updateUser(this.form.value).subscribe(
                (user: User) => console.log(user)
            );
        }
    }
}
