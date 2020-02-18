import {browser, by, element, ElementFinder} from 'protractor';
import {promise} from 'selenium-webdriver';
import {Credentials} from '../../src/app/auth/interfaces/credentials';

export class LoginPage {
    public navigateTo(): any {
        return browser.get('/auth/login');
    }

    public async fillCredentials(cred: Credentials): Promise<void> {
        await element(by.css('ion-input[name="username"] input')).sendKeys(cred.username);
        await element(by.css('ion-input[name="password"] input')).sendKeys(cred.password);

        return;
    }

    public getSubmitButton(): ElementFinder {
        return element(by.css('ion-button[type="submit"]'));
    }

    public getErrorMessage(): promise.Promise<string> {
        return element(by.className('error-flash')).getText();
    }

    public getPasswordRecoverButton(): ElementFinder {
        return element(by.css('ion-button[color="secondary"]'));
    }
}
