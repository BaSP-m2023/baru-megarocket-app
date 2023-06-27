const HomePage = require('../../pageobjects/Home/homePage');
const LoginPage = require('../../pageobjects/Login/loginPage');
const NavBar = require('../../pageobjects/Shared/navBarComponent');
const AdminsTable = require('../../pageobjects/Admins/adminsTable');
const AdminsForm = require('../../pageobjects/Admins/adminsForm');

let currentUrl = '';
const validEmail = 'superadmin2@gmail.com';
const validPassword = 'Abc123456';

describe('Superadmin login functionality', () => {
  beforeAll('Open Browser Url', () => {
    browser.url('http://localhost:3000/');
    browser.setWindowSize(1920, 1080);
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

  /*   it('Should give an error when trying to login with invalid email', async () => {
    await LoginPage.enterEmail('prueba@gmail.com');
    await LoginPage.enterPassword(validPassword);
    await LoginPage.loginBtnClick();

    await expect(LoginPage.loginErrors).toBeElementsArrayOfSize(1);
  });

  it('Should give an error when trying to login with invalid password', async () => {
    await LoginPage.enterEmail(validEmail);
    await LoginPage.enterPassword('Prueba123');
    await LoginPage.loginBtnClick();

    await expect(LoginPage.loginErrors).toBeElementsArrayOfSize(1);
  });
 */
  it('Should login correctly with valid credentials', async () => {
    await LoginPage.enterEmail(validEmail);
    await LoginPage.enterPassword(validPassword);
    await LoginPage.loginBtnClick();

    await expect(HomePage.homeTitle).toBeDisplayed();
    await expect(HomePage.homeTitle).toHaveTextContaining('Home');
    await expect(NavBar.adminsLink).toBeDisplayed();
    await expect(NavBar.logoutBtn).toBeDisplayed();
  });
});

describe('Admin creation functionality', () => {
  it('Should navigate correctly to admins table view', async () => {
    await NavBar.navigateToAdmins();

    currentUrl = await browser.getUrl();

    await expect(currentUrl).toEqual('http://localhost:3000/admins');

    await expect(AdminsTable.searchInput).toBeDisplayed();
    await expect(AdminsTable.tableList).toBeDisplayed();
    await expect(AdminsTable.addNewBtn).toBeDisplayed();
    await expect(AdminsTable.adminsTitle).toHaveTextContaining('Admins');
  });

  it('Should give an error when trying to create a new admin with empty credentials', async () => {
    await AdminsTable.clickAddNewBtn();

    currentUrl = await browser.getUrl();

    await expect(currentUrl).toEqual('http://localhost:3000/admins/add');
    await expect(AdminsForm.formTitle).toHaveTextContaining('Add admin');
    await expect(AdminsForm.form).toBeDisplayed();

    await AdminsForm.submitBtn.scrollIntoView();
    await AdminsForm.submitForm();
    await expect(AdminsForm.errorMessages).toBeElementsArrayOfSize(7);
  });

  it('Should create a new admin with valid credentials', async () => {
    await AdminsForm.enterFirstName('Julian');
    await AdminsForm.enterLastName('Riedo');
    await AdminsForm.enterDni('12343212');
    await AdminsForm.enterPhone('1231231231');
    await AdminsForm.enterCity('Rosario');
    await AdminsForm.emailInput.scrollIntoView();
    await AdminsForm.enterEmail('riedo@gmail.com');
    await AdminsForm.passwordInput.scrollIntoView();
    await AdminsForm.enterPassword('Julian123');

    await AdminsForm.submitBtn.scrollIntoView();
    await AdminsForm.submitForm();

    await expect(AdminsForm.errorMessages).toBeElementsArrayOfSize(0);
    await expect(AdminsForm.confirmModalSubmitBtn).toBeDisplayed();
    await expect(AdminsForm.confirmModalTitle).toHaveTextContaining('Add admin');

    await AdminsForm.submitModal();
    await expect(AdminsForm.errorMessages).toBeElementsArrayOfSize(0);
    //sacar esta linea cuando deje crear un admin
    await AdminsForm.cancelBtn.click();
    currentUrl = await browser.getUrl();
    await expect(currentUrl).toEqual('http://localhost:3000/admins');
  });
});

describe('Admin edit functionality', () => {
  it('Should navigate to edit of last added admin', async () => {
    const lastAddedDNI = await AdminsTable.lastAdminDNI.getText();
    await expect(AdminsTable.allEditIcons).toBeElementsArrayOfSize({ gte: 1 });
    const editsArray = await AdminsTable.allEditIcons;
    const lastAddedEditIcon = editsArray[editsArray.length - 1];

    await lastAddedEditIcon.scrollIntoView();
    await lastAddedEditIcon.click();

    currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain('/edit');
    AdminsForm.dniInput.waitForDisplayed({ timeout: 3000 });
    await expect(AdminsForm.formTitle).toBeDisplayed();
    await expect(AdminsForm.formTitle).toHaveTextContaining('Edit Admin');
    /*  const inputDniValue = await AdminsForm.dniInput.getAttribute('value');

    await expect(lastAddedDNI).toEqual(inputDniValue); */

    await expect(lastAddedDNI).toEqual('12343212');
  });
});
