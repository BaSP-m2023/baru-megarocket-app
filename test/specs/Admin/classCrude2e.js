const HomePage = require('../../pageobjects/Home/homePage');
const LoginPage = require('../../pageobjects/Login/loginPage');
const NavBar = require('../../pageobjects/Shared/navBarComponent');

let currentUrl = '';
const validEmail = 'secondadmin@gmail.com';
const validPassword = 'Abc123456';

describe('Admin login functionality', () => {
  beforeAll('Open Browser Url', () => {
    browser.setWindowSize(1920, 1080);
    browser.url('http://localhost:3000/');
  });

  it('Should navigate correctly to login page', async () => {
    await expect(HomePage.homeTitle).toBeDisplayed();
    await expect(HomePage.loginBtn).toBeDisplayed();

    await HomePage.loginBtnClick();

    currentUrl = await browser.getUrl();
    await expect(currentUrl).toEqual('http://localhost:3000/login');
    await expect(LoginPage.loginTitle).toBeDisplayed();
    await expect(LoginPage.emailInput).toBeDisplayed();
    await expect(LoginPage.passwordInput).toBeDisplayed();
  });

  it('Should give an error when trying to login with empty credentials', async () => {
    await LoginPage.loginBtnClick();

    await expect(LoginPage.loginErrors).toBeElementsArrayOfSize(2);
    const emailError = await LoginPage.loginErrors[0];
    const passwordError = await LoginPage.loginErrors[1];

    await expect(emailError).toHaveTextContaining('Email is required');
    await expect(passwordError).toHaveTextContaining('Password is required');
  });

  it('Should login correctly with valid credentials', async () => {
    await LoginPage.enterEmail(validEmail);
    await LoginPage.enterPassword(validPassword);
    await LoginPage.loginBtnClick();

    await expect(HomePage.homeTitle).toBeDisplayed();
    await expect(HomePage.homeTitle).toHaveTextContaining('Home');
    await expect(NavBar.classesLink).toBeDisplayed();
    await expect(NavBar.logoutBtn).toBeDisplayed();
  });
});
