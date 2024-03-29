const LoginPage = require('../../pageobjects/LoginPage');
const ActivitiesPage = require('../../pageobjects/Admin/ActivitiesPage');
const LogoutPage = require('../../pageobjects/LogoutPage');

describe('Verify login with user with valid credentials', () => {
  beforeAll('Open browser', () => {
    browser.setWindowSize(1300, 700);
    browser.url('https://baru-megarocket-app.vercel.app/');
  });
  it('user should log in correctly', async () => {
    await expect(LoginPage.logoContainer).toExist();
    await LoginPage.loginBtn.click();
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/auth/login');
  });
  it('user should log in as an admin', async () => {
    await expect(LoginPage.loginEmailContainer).toBeDisplayed();
    await expect(LoginPage.loginPasswordContainer).toBeDisplayed();
    await LoginPage.loginEmailInput.setValue('secondadmin@gmail.com');
    await LoginPage.loginPassInput.setValue('Abc123456');
    await LoginPage.loginGreenBtn.click();
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/user/admin/home');
  });
  it('user should be able to add a new activity', async () => {
    await ActivitiesPage.ActivitiesNavBar.click();
    await ActivitiesPage.ActivitiesAddNew.click();
    await expect(ActivitiesPage.ActivitiesAddTitle).toBeDisplayed();
    await ActivitiesPage.ActivitiesAddName.setValue('Zumba');
    await ActivitiesPage.ActivitiesAddTrainerSelector.click();
    await ActivitiesPage.ActivitiesAddTrainerSelector.setValue('Manu Ginnobili');
    await browser.keys(['Enter']);
    await ActivitiesPage.ActivitiesAddDescription.setValue(
      'a progressive fitness program that blends Latin music and dynamic Latin-inspired dance moves'
    );
    await ActivitiesPage.ActivitiesSubmitBtn.click();
    await ActivitiesPage.ActivitiesModal.click();
  });
  it('user should be able to edit an activity', async () => {
    await ActivitiesPage.ActivitiesEditBtn.click();
    await expect(ActivitiesPage.ActivitiesEditTitle).toBeDisplayed();
    await ActivitiesPage.ActivitiesEditName.setValue('Pilates');
    await ActivitiesPage.ActivitiesEditDescription.setValue(
      'exercise performed lying down that stretches and lengthens the muscles'
    );
    await ActivitiesPage.ActivitiesSubmitBtn.click();
    await ActivitiesPage.ActivitiesModal.click();
  });
  it('user should delete an activity', async () => {
    await ActivitiesPage.ActivitiesDeleteIcon.click();
    await expect(ActivitiesPage.ActivitiesModal).toBeDisplayed();
    await ActivitiesPage.ActivitiesDeleteBtn.click();
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/user/admin/activities');
  });
  it('user should be able to logout', async () => {
    await LogoutPage.LogOutBtn.click();
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/');
  });
});
