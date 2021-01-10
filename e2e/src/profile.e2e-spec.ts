import { browser } from 'protractor';
import { environment, testing } from '../../src/environments/environment';
import { ProfilePage } from './profile.po';

describe('Profile page', () => {
    let page: ProfilePage;

    beforeEach(() => {
        page = new ProfilePage();
        page.navigateTo();
    });

    it('test main info', async (done) => {
        expect(await page.getUserName().getText()).toEqual(testing.registration.name);
        expect(await page.getEmail().getText()).toEqual(testing.registration.email);
        expect(await page.getDefaultLocation().getText())
            .toEqual(`${testing.registration.country}, ${testing.registration.firstPopoverOption}`);
        done();
    });

    it('test main', async (done) => {
        browser.sleep(1000);
        await page.clickEditMain();
        expect(await browser.driver.getCurrentUrl()).toEqual(environment.origin + '/profile/edit');
        await page.fillEditUserForm();
        browser.sleep(1000);
        await page.submitEditUserForm();
        browser.sleep(2000);
        page.navigateTo();
        browser.refresh(500);
        await browser.navigate().refresh();
        browser.sleep(4000);
        expect(await browser.driver.getCurrentUrl()).toEqual(environment.origin + '/profile');
        expect(await page.getUserName().getText()).toEqual(`${page.newProfileData.firstName} ${page.newProfileData.secondName}`);


        done();
    });
});
