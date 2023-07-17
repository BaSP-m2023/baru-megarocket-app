const LoginPage = require('../../pageobjects/LoginPage');
const SchedulePage = require('../../pageobjects/Member/SchedulePage');
const ActivitiesPage = require('../../pageobjects/Member/ActivitiesPage');
const SubscriptionPage = require('../../pageobjects/Member/SubscriptionPage');
const LogoutPage = require('../../pageobjects/Member/LogoutPage');
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
  it('user should complete form', async () => {
    await expect(LoginPage.loginEmailInput).toBeDisplayed();
    await expect(LoginPage.loginPassInput).toBeDisplayed();
    await LoginPage.loginEmailInput.setValue('firstmember1@gmail.com');
    await LoginPage.loginPassInput.setValue('Abc123456');
    await LoginPage.loginGreenBtn.click();
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/user/member/home');
  });
  it('user should see the schedule and be able to filter by activities and trainers', async () => {
    await SchedulePage.ScheduleNavBar.click();
    await expect(SchedulePage.homePageSchedule).toBeDisplayed();
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/user/member/schedule');
    await SchedulePage.filterByActivityInput.click();
    await SchedulePage.filterByActivityBoxing.click();
    await SchedulePage.filterByActivityAll.click();
    await SchedulePage.filterByTrainerInput.click();
    await SchedulePage.filterByTrainerNico.click();
    await SchedulePage.filterByTrainerAll.click();
  });
  it('user should see the activities', async () => {
    await ActivitiesPage.ActivitiesNavBar.click();
    await expect(ActivitiesPage.ActivitiesHomePage).toBeDisplayed();
    await expect(browser).toHaveUrl(
      'https://baru-megarocket-app.vercel.app/user/member/activities'
    );
  });
  it('user should unsubscribe to any activity', async () => {
    await SubscriptionPage.SubscriptionNavBar.click();
    await expect(SubscriptionPage.Subscriptionlist).toBeDisplayed();
    await expect(browser).toHaveUrl(
      'https://baru-megarocket-app.vercel.app/user/member/subscriptions'
    );
    await SubscriptionPage.UnSubscriptionListBtn.click();
    await SubscriptionPage.UnSubscriptionModal.toBeDisplayed();
    await SubscriptionPage.deleteBtnmodal.click();
  });
  it('user should be able to logout', async () => {
    await LogoutPage.LogOutBtn.click();
    await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/');
  });
});
