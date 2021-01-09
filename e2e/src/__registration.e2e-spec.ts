import {browser} from 'protractor';
import {environment, testing} from '../../src/environments/environment';
import {RegistrationPage} from './registration.po';

describe('Registration page', () => {
    let page: RegistrationPage;

    const registrationData = {
        email: testing.registration.email,
        password: testing.registration.password,
        confirm: testing.registration.confirm,
        name: testing.registration.name,
        phone: testing.registration.phone,
    };

    beforeEach(() => {
        page = new RegistrationPage();
        page.navigateTo();
    });

    it('test popover', async (done) => {
        browser.sleep(3000);
        await page.getFirstPopoverOption().click();
        expect(await page.getCountyInputText()).toEqual(testing.registration.country);
        expect(await page.getCityInputText()).toEqual(testing.registration.firstPopoverOption);
        done();
    });

    it('test submit registration form', async (done) => {
        browser.sleep(3000);
        await page.getFirstPopoverOption().click();
        await page.fillForm(registrationData);

        await page.getSubmitButton().click();
        browser.sleep(10000);
        const url = await browser.driver.getCurrentUrl();
        expect(url).toEqual(environment.origin + '/profile');
        done();
    });

});
