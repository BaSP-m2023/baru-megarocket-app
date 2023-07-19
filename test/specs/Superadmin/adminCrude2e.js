const HomePage = require('../../pageobjects/Home/homePage');
const LoginPage = require('../../pageobjects/Login/loginPage');
const NavBar = require('../../pageobjects/Shared/navBarComponent');
const AdminsTable = require('../../pageobjects/Admins/adminsTable');
const AdminsForm = require('../../pageobjects/Admins/adminsForm');
const ResponseModal = require('../../pageobjects/Shared/responseModalComponent');

let currentUrl = '';
const validEmail = 'superadmin2@gmail.com';
const validPassword = 'Abc123456';

describe('Superadmin Admins CRUD', () => {
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
      await expect(currentUrl).toEqual('http://localhost:3000/auth/login');
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

    it('Should give an error when trying to login with invalid email', async () => {
      await LoginPage.enterEmail('adsasd@gmail.com');
      await LoginPage.enterPassword(validPassword);
      await LoginPage.loginBtnClick();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 5000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('Wrong email or password');
    });

    it('Should give an error when trying to login with invalid password', async () => {
      await LoginPage.enterEmail(validEmail);
      await LoginPage.enterPassword('asdasd12');
      await LoginPage.loginBtnClick();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 5000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('Wrong email or password');
    });

    it('Should login correctly with valid credentials', async () => {
      await LoginPage.enterEmail(validEmail);
      await LoginPage.enterPassword(validPassword);
      await LoginPage.loginBtnClick();

      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
      await expect(NavBar.adminsLink).toBeDisplayed();
      await expect(NavBar.logoutBtn).toBeDisplayed();
    });
  });

  describe('Admin creation functionality', () => {
    it('Should navigate correctly to admins table view', async () => {
      await NavBar.navigateToAdmins();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('http://localhost:3000/user/super-admin/admins');

      await expect(AdminsTable.searchInput).toBeDisplayed();
      await expect(AdminsTable.tableList).toBeDisplayed();
      await expect(AdminsTable.addNewBtn).toBeDisplayed();
      await expect(AdminsTable.adminsTitle).toHaveTextContaining('Admins');
    });

    it('Should give an error when trying to create a new admin with empty credentials', async () => {
      await AdminsTable.clickAddNewBtn();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('http://localhost:3000/user/super-admin/admins/add');
      await expect(AdminsForm.formTitle).toHaveTextContaining('Add admin');
      await expect(AdminsForm.form).toBeDisplayed();

      await AdminsForm.submitBtn.scrollIntoView();
      await AdminsForm.submitForm();
      await AdminsForm.confirmModalCancelBtn.click();
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

      await expect(AdminsForm.confirmModalSubmitBtn).toBeDisplayed();
      await expect(AdminsForm.confirmModalTitle).toHaveTextContaining('Add admin');

      await AdminsForm.submitModal();

      await expect(ResponseModal.modalText).toBeDisplayed();
      await expect(ResponseModal.modalText).toHaveTextContaining('Admin created');

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual('http://localhost:3000/user/super-admin/admins');
    });
  });

  describe('Admin edit functionality', () => {
    it('Should navigate to edit of last added admin', async () => {
      await expect(AdminsTable.allEditIcons).toBeElementsArrayOfSize({ gte: 1 });
      const editsArray = await AdminsTable.allEditIcons;
      const lastAddedEditIcon = editsArray[editsArray.length - 1];

      await lastAddedEditIcon.scrollIntoView();
      await lastAddedEditIcon.click();

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toContain('/admins/edit');
      await expect(AdminsForm.formTitle).toBeDisplayed();
      await expect(AdminsForm.formTitle).toHaveTextContaining('Edit Admin');

      await browser.pause(2000);
      await AdminsForm.enterFirstName('Julio');
      await AdminsForm.enterDni('40123111');

      await AdminsForm.submitBtn.scrollIntoView();
      await AdminsForm.submitForm();

      await AdminsForm.confirmModalTitle.waitForDisplayed({ timeout: 3000 });
      await expect(AdminsForm.confirmModalTitle).toHaveTextContaining('Update Admin');

      await AdminsForm.submitModal();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 3000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('Admin updated');

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual('http://localhost:3000/user/super-admin/admins');
    });
  });

  describe('Admin delete & logout functionality', () => {
    it('Should delete correctly the last added admin', async () => {
      await expect(AdminsTable.tableList).toBeDisplayed();
      const deleteIconsArray = await AdminsTable.allDeleteIcons;
      const addedClassDeleteIcon = await deleteIconsArray[deleteIconsArray.length - 1];

      await addedClassDeleteIcon.click();

      await expect(AdminsForm.confirmModalTitle).toBeDisplayed();
      await AdminsForm.submitModal();

      await expect(ResponseModal.modalText).toBeDisplayed();
      await expect(ResponseModal.modalText).toHaveTextContaining('Admin deleted');
      await ResponseModal.modalText.waitForDisplayed({ reverse: true });
    });

    it('Superadmin should logout correctly', async () => {
      await expect(NavBar.logoutBtn).toBeDisplayed();

      await NavBar.logoutBtn.scrollIntoView();

      await NavBar.logoutBtnClick();

      await expect(ResponseModal.modalText).toBeDisplayed();
      await expect(ResponseModal.modalText).toHaveTextContaining('See you later');

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('http://localhost:3000/');
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
    });
  });
});
