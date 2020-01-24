import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {UserInterface} from '@app/shared/interfaces/user.interface';
import {User} from '@app/shared/models/user';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    private form: FormGroup;

    constructor(private userManager: UserManagerService) {
    }

    ngOnInit() {
        this.userManager.getUser().subscribe(
            (user: UserInterface) => {
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
                    settings: new FormGroup({
                        push: new FormControl(user.settings.push),
                        autoLocation: new FormControl(user.settings.autoLocation),
                        location: new FormControl(user.settings.location)
                    })
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
