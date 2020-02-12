import { browser, by, element } from 'protractor';
import {Credentials} from '../../src/app/auth/interfaces/credentials';

export class LoginPage {
    navigateTo() {
        return browser.get('/auth/login');
    }

    async fillCredentials(cred: Credentials): Promise<void> {
        await element(by.css('ion-input[name="username"] input')).sendKeys(cred.username);
        await element(by.css('ion-input[name="password"] input')).sendKeys(cred.password);

        return;
    }

    getSubmitButton() {
        return element(by.css('ion-button[type="submit"]'));
    }

    getErrorMessage() {
        return element(by.className('error-flash')).getText();
    }

    getPasswordRecoverButton() {
        return element(by.css('ion-button[color="secondary"]'));
    }
}
