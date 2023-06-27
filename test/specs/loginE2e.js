const loginPage = require('../pageObjects/loginPage');

describe('Log in into the Home Page', () => {
  beforeAll('browser', () => {
    browser.url('http://localhost:3000/');
  });
  it('click on log in button', async () => {
    await expect(loginPage.loginbtn).toBeDisplayed();
    await loginPage.loginbtnClick();
  });
});
