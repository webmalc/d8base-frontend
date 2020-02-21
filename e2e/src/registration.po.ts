import {browser, by, element, ElementFinder} from 'protractor';

export class RegistrationPage {
    public navigateTo(): any {
        return browser.get('/auth/registration');
    }

    public async fillForm(data: {
        email: string,
        password: string,
        confirm: string,
        name: string,
        phone: string,
        country: string,
        city: string
    }): Promise<void> {
        await element(by.css('ion-input[name="email"] input')).sendKeys(data.email);
        await element(by.css('ion-input[name="password"] input')).sendKeys(data.password);
        await element(by.css('ion-input[name="confirm"] input')).sendKeys(data.confirm);
        await element(by.css('ion-input[name="name"] input')).sendKeys(data.name);
        await element(by.css('ion-input[name="phone"] input')).sendKeys(data.phone);
        await element(by.css('ion-input[name="country"] input')).sendKeys(data.country);
        await element(by.css('ion-input[name="city"] input')).sendKeys(data.city);

        return;
    }

    public getSubmitButton(): ElementFinder {
        return element(by.css('ion-button[type="submit"]'));
    }
}
