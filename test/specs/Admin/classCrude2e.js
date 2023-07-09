const HomePage = require('../../pageobjects/Home/homePage');
const LoginPage = require('../../pageobjects/Login/loginPage');
const NavBar = require('../../pageobjects/Shared/navBarComponent');
const ClassesTable = require('../../pageobjects/Classes/classesTable');
const ResponseModal = require('../../pageobjects/Shared/responseModalComponent');

let currentUrl = '';
const validEmail = 'secondadmin@gmail.com';
const validPassword = 'Abc123456';

describe('Admin Classes CRUD', () => {
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

    it('Should login correctly with valid credentials', async () => {
      await LoginPage.enterEmail(validEmail);
      await LoginPage.enterPassword(validPassword);
      await LoginPage.loginBtnClick();

      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
      await expect(NavBar.classesLink).toBeDisplayed();
      await expect(NavBar.logoutBtn).toBeDisplayed();
    });
  });

  describe('Class creation functionality', () => {
    it('Should navigate correctly to classes table view', async () => {
      await NavBar.navigateToClasses();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('http://localhost:3000/user/admin/classes');

      await expect(ClassesTable.filterByActivityInput).toBeDisplayed();
      await expect(ClassesTable.filterByTrainerInput).toBeDisplayed();
      await expect(ClassesTable.tableList).toBeDisplayed();
    });

    it('Should give an error when trying to create a new class with empty info', async () => {
      await ClassesTable.lastEmptyHour.scrollIntoView();
      await ClassesTable.clickLastEmptyHour();

      await expect(ClassesTable.modalForm).toBeDisplayed();
      await expect(ClassesTable.modalFormTitle).toHaveTextContaining('Create class');
      await expect(ClassesTable.modalFormSubmitBtn).toBeDisplayed();

      await ClassesTable.submitModalForm();
      await expect(ClassesTable.errorMessages).toBeElementsArrayOfSize({ gte: 1 });
    });

    it('Should create a new class with valid info and return to table view', async () => {
      await ClassesTable.enterActivity('Boxing');
      await ClassesTable.enterTrainer(0);
      await ClassesTable.enterCapacity(10);

      await ClassesTable.submitModalForm();

      await expect(ClassesTable.confirmSubmitBtn).toBeDisplayed();
      await ClassesTable.clickConfirmBtn();

      await expect(ClassesTable.tableList).toBeDisplayed();
      await expect(ResponseModal.modalText).toBeDisplayed();
      await expect(ClassesTable.filterByActivityInput).toBeDisplayed();
      await expect(ClassesTable.filterByTrainerInput).toBeDisplayed();
    });
  });

  describe('Class edit functionality', () => {
    it('Should filter and update previously created class', async () => {
      await ClassesTable.filterActivity('Boxing');
      const previouslyAddedClass = $(
        '[data-testid="classes-list"] tr:last-child td div:not(:empty)'
      );

      await expect(previouslyAddedClass).toBeDisplayed();
      await previouslyAddedClass.click();

      await expect(ClassesTable.modalForm).toBeDisplayed();
      await expect(ClassesTable.modalFormTitle).toHaveTextContaining('Update class');
      await expect(ClassesTable.modalFormSubmitBtn).toBeDisplayed();

      await ClassesTable.enterActivity('Crossfit');
      await ClassesTable.submitModalForm();

      await expect(ClassesTable.confirmSubmitBtn).toBeDisplayed();
      await ClassesTable.clickConfirmBtn();

      await expect(ResponseModal.modalText).toBeDisplayed();
      await expect(ResponseModal.modalText).toHaveTextContaining('Class updated');
      await expect(ClassesTable.tableList).toBeDisplayed();
    });
  });

  describe('Class delete & logout functionality', () => {
    it('Should filter and delete previously updated class', async () => {
      await ClassesTable.filterActivity('Crossfit');
      const previouslyAddedClass = $(
        '[data-testid="classes-list"] tr:last-child td div:not(:empty)'
      );

      await expect(previouslyAddedClass).toBeDisplayed();
      await previouslyAddedClass.click();

      await expect(ClassesTable.modalForm).toBeDisplayed();
      await expect(ClassesTable.modalFormTitle).toHaveTextContaining('Update class');
      await expect(ClassesTable.modalFormDelete).toBeDisplayed();

      await ClassesTable.clickModalFormDelete();
      await expect(ClassesTable.confirmSubmitBtn).toBeDisplayed();

      await ClassesTable.clickConfirmBtn();

      await expect(ResponseModal.modalText).toBeDisplayed();
      await expect(ResponseModal.modalText).toHaveTextContaining('Class deleted');
      await expect(ClassesTable.tableList).toBeDisplayed();

      const isExisting = await previouslyAddedClass.isExisting();
      await expect(isExisting).toBe(false);
    });

    it('Admin should logout correctly', async () => {
      await expect(NavBar.logoutBtn).toBeDisplayed();

      await NavBar.logoutBtn.scrollIntoView();

      await NavBar.logoutBtnClick();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 5000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('See you later');

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('http://localhost:3000/');
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
    });
  });
});
