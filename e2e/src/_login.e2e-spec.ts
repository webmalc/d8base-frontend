import {browser} from 'protractor';
import {Credentials} from '../../src/app/auth/interfaces/credentials';
import {environment, testing} from '../../src/environments/environment';
import {LoginPage} from './login.po';

describe('Login page', () => {
    let page: LoginPage;

    const wrongCredentials: Credentials = {
        username: 'test12',
        password: 'test1',
    };
    const credentials: Credentials = {
        username: testing.registration.email,
        password: testing.registration.password,
    };

    beforeEach(() => {
        page = new LoginPage();
    });

    it('test wrong credentials auth', async () => {
        page.navigateTo();

        await page.fillCredentials(wrongCredentials);
        page.getSubmitButton().click();
        browser.sleep(1000);

        expect(await page.getErrorMessage()).toEqual('Incorrect login or password');
    });
    it('test auth', async (done) => {
        page.navigateTo();

        await page.fillCredentials(credentials);

        page.getSubmitButton().click().then(() => {
            browser.sleep(1000);
            browser.driver.getCurrentUrl().then( async (url) => {
                browser.sleep(1000);
                expect(url).toEqual(environment.origin + '/profile');
                done();
            });
        });
    });
    it('test password recover button click', async (done) => {
        page.navigateTo();

        page.getPasswordRecoverButton().click().then(() => {
            browser.driver.getCurrentUrl().then(url => {
                expect(url).toEqual(environment.origin + '/auth/password-recover');
                done();
            });
        });
    });
});
