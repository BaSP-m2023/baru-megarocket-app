// const LoginPage = require('../../pageobjects/LoginPage');
// const SchedulePage = require('../../pageobjects/Member/SchedulePage');
// const ActivitiesPage = require('../../pageobjects/Member/ActivitiesPage');
// const SubscriptionPage = require('../../pageobjects/Member/SubscriptionPage');
// const LogoutPage = require('../../pageobjects/LogoutPage');
// describe('Verify login with user with valid credentials', () => {
//   beforeAll('Open browser', () => {
//     browser.setWindowSize(1300, 700);
//     browser.url('http://localhost:3000');
//   });
//   it('user should log in correctly', async () => {
//     await expect(LoginPage.logoContainer).toExist();
//     await LoginPage.loginBtn.click();
//     await expect(browser).toHaveUrl('http://localhost:3000/auth/login');
//   });
//   it('user should complete form', async () => {
//     await expect(LoginPage.loginEmailInput).toBeDisplayed();
//     await expect(LoginPage.loginPassInput).toBeDisplayed();
//     await LoginPage.loginEmailInput.setValue('firstmember1@gmail.com');
//     await LoginPage.loginPassInput.setValue('Abc123456');
//     await LoginPage.loginGreenBtn.click();
//     await expect(browser).toHaveUrl('http://localhost:3000/user/member/home');
//   });
//   // it('user should be able to subscribe to an activity', async () => {
//   //   await SchedulePage.ScheduleNavBar.click();
//   //   const ActivitiesArrays = await SchedulePage.allActivities;
//   //   const lastActivity = ActivitiesArrays[ActivitiesArrays.length - 1];
//   //   // // await lastActivity.scrollIntoView();
//   //   await lastActivity.click();
//   //   // await SchedulePage.subscribeBtn.click();
//   // });
//   it('user should see the activities', async () => {
//     await ActivitiesPage.ActivitiesNavBar.click();
//     await expect(ActivitiesPage.ActivitiesHomePage).toBeDisplayed();
//     await browser.pause(2000);
//     await expect(browser).toHaveUrl('http://localhost:3000/user/member/activities');
//   });
//   // it('user should unsubscribe to any activity', async () => {
//   //   await SubscriptionPage.SubscriptionNavBar.click();
//   //   await expect(SubscriptionPage.Subscriptionlist).toBeDisplayed();
//   //   await expect(browser).toHaveUrl('http://localhost:3000/user/member/subscriptions');
//   //   await SubscriptionPage.UnSubscriptionListBtn.click();
//   //   await SubscriptionPage.UnSubscriptionModal.toBeDisplayed();
//   //   await SubscriptionPage.deleteBtnmodal.click();
//   // });
//   // it('user should be able to logout', async () => {
//   //   await LogoutPage.LogOutBtn.click();
//   //   await expect(browser).toHaveUrl('http://localhost:3000/');
//   // });
// });
