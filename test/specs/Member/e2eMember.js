const LoginPage = require('../../pageobjects/LoginPage');
const ActivitiesPage = require('../../pageobjects/Member/ActivitiesPage');

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
    await LoginPage.loginEmailInput.setValue('firstmember1@gmail.com');
    await LoginPage.loginPassInput.setValue('Abc123456');
    await LoginPage.loginGreenBtn.click();
  });
  it('user should be redirected to home member page', async () => {
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/');
    await expect(LoginPage.homePage).toBeDisplayed();
  });
  it('user should get into activities', async () => {
    await ActivitiesPage.ActivitiesNavBar.click();
    await expect(browser).toHaveUrl(
      'https://baru-megarocket-app.vercel.app/user/members/subscribe-class'
    );
    await expect(LoginPage.homePage).toBeDisplayed();
  });
});
