// const LoginPage = require('../../pageobjects/LoginPage');
// const SchedulePage = require('../../pageobjects/Member/SchedulePage');
// const ActivitiesPage = require('../../pageobjects/Member/ActivitiesPage');
// const SubscriptionPage = require('../../pageobjects/Member/SubscriptionPage');
// const LogoutPage = require('../../pageobjects/Member/LogoutPage');
// describe('Verify login with user with valid credentials', () => {
//   beforeAll('Open browser', () => {
//     browser.url('http://localhost:3000/');
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
//   });
//   it('user should be redirected to home member page', async () => {
//     await expect(browser).toHaveUrl('http://localhost:3000/user/member/home');
//     await expect(LoginPage.homePage).toBeDisplayed();
//   });
//   it('user should see the schedule', async () => {
//     await SchedulePage.ScheduleNavBar.click();
//     await expect(LoginPage.homePage).toBeDisplayed();
//   });
//   it('user should see the activities', async () => {
//     await ActivitiesPage.ActivitiesNavBar.click();
//     await expect(ActivitiesPage.ActivitiesSubs).toBeDisplayed();
//     await ActivitiesPage.ActivitiesBox.click();
//     await ActivitiesPage.cancelBtn.click();
//   });
//   it('user should subscribe to basquet activity', async () => {
//     await ActivitiesPage.ActivitiesBasquet.click();
//     await expect(ActivitiesPage.ActivitiesSubsBasquet).toBeDisplayed();
//     await ActivitiesPage.ActivitiesSelection.click();
//     await ActivitiesPage.ActivitiesSubsSelect.click();
//     await ActivitiesPage.submitBtn.click();
//     await ActivitiesPage.submitBtnBasmodal.click();
//     await expect(browser).toHaveUrl(
//       'https://baru-megarocket-app.vercel.app/user/members/subscribe-class'
//     );
//   });
//   it('user should unsubscribe from basquet activity', async () => {
//     await SubscriptionPage.SubscriptionNavBar.click();
//     await expect(SubscriptionPage.Subscriptionlist).toBeDisplayed();
//     await SubscriptionPage.UnSubscriptionListBtn.click();
//     await expect(SubscriptionPage.SubscriptionModal).toBeDisplayed();
//     await SubscriptionPage.deleteBtnmodal.click();
//     await expect(browser).toHaveUrl(
//       'https://baru-megarocket-app.vercel.app/user/members/subscriptions'
//     );
//   });
//   it('user should be able to logout', async () => {
//     await LogoutPage.LogOutBtn.click();
//     await expect(browser).toHaveUrl('https://baru-megarocket-app.vercel.app/');
//   });
// });
