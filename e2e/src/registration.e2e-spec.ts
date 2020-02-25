import {browser} from 'protractor';
import {environment} from '../../src/environments/environment';
import {RegistrationPage} from './registration.po';

describe('Registration page', () => {
    let page: RegistrationPage;

    const registrationData = {
        email: 'test@test.te',
        password: 'test1',
        confirm: 'test1',
        name: 'testName',
        phone: '123123123',
        country: 'testCountry',
        city: 'testCity'
    };

    beforeEach(() => {
        page = new RegistrationPage();
    });

    it('test submit registration form', async (done) => {
        page.navigateTo();

        await page.fillForm(registrationData);

        page.getSubmitButton().click().then(() => {
            browser.driver.getCurrentUrl().then(url => {
                expect(url).toEqual(environment.origin + '/auth/login');
                done();
            });
        });
    });
});
