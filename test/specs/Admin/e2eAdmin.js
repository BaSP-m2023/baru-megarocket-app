const LoginPage = require('../../pageobjects/LoginPage');
const ActivitiesPage = require('../../pageobjects/Admin/ActivitiesPage');
// const SubscriptionPage = require('../../pageobjects/Member/SubscriptionPage');
// const LogoutPage = require('../../pageobjects/Member/LogoutPage');

describe('Verify login with user with valid credentials', () => {
  beforeAll('Open browser', () => {
    browser.url('https://baru-megarocket-app.vercel.app/');
  });
  it('user should log in correctly', async () => {
    await expect(LoginPage.logoContainer).toExist();
    await LoginPage.loginBtn.click();
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/login');
  });
  it('user should complete form', async () => {
    await expect(LoginPage.loginEmailInput).toBeDisplayed();
    await expect(LoginPage.loginPassInput).toBeDisplayed();
    await LoginPage.loginEmailInput.setValue('secondadmin@gmail.com');
    await LoginPage.loginPassInput.setValue('Abc123456');
    await LoginPage.loginGreenBtn.click();
  });
  it('user should be redirected to home admin page', async () => {
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/');
    await expect(LoginPage.homePage).toBeDisplayed();
  });
  it('user should be able to add a new activity', async () => {
    await ActivitiesPage.ActivitiesNavBar.click();
    await expect(ActivitiesPage.ActivitiesSearch).toBeDisplayed();
    await ActivitiesPage.ActivitiesAddNew.click();
    await expect(ActivitiesPage.ActivitiesAddTitle).toBeDisplayed();
    await ActivitiesPage.ActivitiesAddName.setValue('Zumba');
    await ActivitiesPage.ActivitiesAddDescription.setValue('sggsratyeotjbdcobdjbeficadcad');
    await ActivitiesPage.ActivitiesAddTrainerSelector.click();
    await ActivitiesPage.ActivitiesAddTrainer.click();
    await ActivitiesPage.ActivitiesSubmitBtn.click();
  });
  // it('user should be able to edit an activity', async () => {
  //   await ActivitiesPage.ActivitiesNavBar.click();
  //   await expect(ActivitiesPage.ActivitiesSearch).toBeDisplayed();
  //   await ActivitiesPage.ActivitiesEditBtn.click();
  //   await expect(ActivitiesPage.ActivitiesEditTitle).toBeDisplayed();
  //   await ActivitiesPage.ActivitiesEditName.setValue('Pilates');
  //   await ActivitiesPage.ActivitiesEditDescription.setValue('shhsjslfoornsbsttersbbkoodkdjsggsgs');
  // await ActivitiesPage.ActivitiesEditTrainerSelector.click();
  // await ActivitiesPage.ActivitiesEditTrainer.click();
  //   await ActivitiesPage.ActivitiesSubmitBtn.click();
  // });
  // it('user should delete an activity', async () => {
  // await ActivitiesPage.ActivitiesNavBar.click();
  // await expect(ActivitiesPage.ActivitiesSearch).toBeDisplayed();
  // await ActivitiesPage.ActivitiesDeleteIcon.click();
  // await expect(ActivitiesPage.ActivitiesModal).toBeDisplayed();
  // await ActivitiesPage.ActivitiesDeleteBtn.click();
  //   await expect(browser).toHaveUrl(
  //     'https://baru-megarocket-app.vercel.app/activities'
  //   );
  // });
  // it('user should be able to logout', async () => {
  //   await LogoutPage.LogOutBtn.click();
  //   await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/');
  // });
});
