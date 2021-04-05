import { Component, Input } from '@angular/core';

const languages = {
  ru: 'ru',
  en: 'ca',
};

@Component({
  selector: 'app-country-flag',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.scss'],
})
export class CountryFlagComponent {
  @Input()
  public countryCode: string;

  @Input()
  public set lang(value: string) {
    this.countryCode = languages[value];
  }
}
