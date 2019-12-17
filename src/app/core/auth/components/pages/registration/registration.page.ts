import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onSubmitRegistrationForm(user: UserModel) {

  }

}
