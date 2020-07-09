import {browser, by, element, ElementFinder} from 'protractor';

export class ProfilePage {

    public newProfileData = {
        firstName: 'newFirstName',
        secondName: 'newSecondName',
        patronymic: 'newPatronymic'
    };

    public navigateTo(): any {
        return browser.get('/profile');
    }

    public getUserName(): ElementFinder {
        return element(by.css('[id="username"]'));
    }

    public getEmail(): ElementFinder {
        return element(by.css('[id="email"]'));
    }

    public getDefaultLocation(): ElementFinder {
        return element(by.css('[id="default-location"]'));
    }

    public async clickEditMain(): Promise<void> {
        await element(by.css('[id="edit-main"]')).click();

        return ;
    }

    public async fillEditUserForm(): Promise<void> {
        await element(by.css('ion-input[name="first_name"] input')).clear();
        await element(by.css('ion-input[name="first_name"] input')).sendKeys(this.newProfileData.firstName);
        await element(by.css('ion-input[name="last_name"] input')).sendKeys(this.newProfileData.secondName);
        await element(by.css('ion-input[name="patronymic"] input')).sendKeys(this.newProfileData.patronymic);
        await element(by.css('ion-radio[name="male"]')).click();

        return;
    }

    public async submitEditUserForm(): Promise<void> {
        await element(by.css('ion-button[type="submit"]')).getWebElement().click();

        return;
    }

    public async clickAddNewContactBtn(): Promise<void> {
        await element(by.css('[id="add-new-contact"]')).getWebElement().click();
    }
}
