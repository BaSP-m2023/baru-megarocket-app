const HomePage = require('../../pageobjects/Home/homePage');
const LoginPage = require('../../pageobjects/Login/loginPage');
const NavBar = require('../../pageobjects/Shared/navBarComponent');
const ClassesTable = require('../../pageobjects/Classes/classesTable');
const ClassesForm = require('../../pageobjects/Classes/classesForm');
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

      await ResponseModal.modalText.waitForExist({ timeout: 3000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('Successful Login');
      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.homeTitle).toHaveTextContaining('Home');
      await expect(NavBar.classesLink).toBeDisplayed();
      await expect(NavBar.logoutBtn).toBeDisplayed();
    });
  });

  describe('Class creation functionality', () => {
    it('Should navigate correctly to classes table view', async () => {
      await NavBar.navigateToClasses();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('http://localhost:3000/classes');

      await expect(ClassesTable.searchInput).toBeDisplayed();
      await expect(ClassesTable.tableList).toBeDisplayed();
      await expect(ClassesTable.addNewBtn).toBeDisplayed();
      await expect(ClassesTable.classesTitle).toHaveTextContaining('Class List');
    });

    it('Should give an error when trying to create a new class with empty info', async () => {
      await ClassesTable.addNewBtn.scrollIntoView();
      await ClassesTable.clickAddNewBtn();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('http://localhost:3000/classes/add');
      await expect(ClassesForm.formTitle).toHaveTextContaining('Create Class');
      await expect(ClassesForm.form).toBeDisplayed();

      await ClassesForm.submitBtn.scrollIntoView();
      await ClassesForm.submitForm();
      await ClassesForm.errorMessage.waitForDisplayed({ timeout: 3000 });
      await expect(ClassesForm.errorMessage).toBeDisplayed();
    });

    it('Should create a new class with valid info and return to table view', async () => {
      await ClassesForm.enterActivity('Boxeo');
      await browser.keys(['Enter']);
      await ClassesForm.enterTrainer('Igna Peine');
      await browser.keys(['Enter']);
      await ClassesForm.enterDay('Monday');
      await browser.keys(['Enter']);
      await ClassesForm.enterTime('16:30');
      await ClassesForm.enterCapacity(10);

      await ClassesForm.submitForm();

      await ClassesForm.confirmModalTitle.waitForDisplayed({ timeout: 3000 });
      await expect(ClassesForm.confirmModalTitle).toHaveTextContaining('Create class');

      await ClassesForm.submitModal();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 5000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('Class created');

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual('http://localhost:3000/classes');
    });
  });

  describe('Class edit functionality', () => {
    it('Should update correctly when changing class time', async () => {
      await expect(ClassesTable.tableList).toBeDisplayed();
      const editIconsArray = await ClassesTable.allEditIcons;
      const addedClassEditIcon = await editIconsArray[editIconsArray.length - 1];

      await addedClassEditIcon.click();

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toContain('/classes/edit');

      await ClassesForm.selectTimeInput.scrollIntoView();
      await ClassesForm.enterTime('19:30');
      await ClassesForm.submitBtn.scrollIntoView();
      await ClassesForm.submitForm();

      await ClassesForm.confirmModalTitle.waitForDisplayed({ timeout: 3000 });
      await expect(ClassesForm.confirmModalTitle).toHaveTextContaining('Update class');

      await ClassesForm.submitModal();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 5000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('Class updated');

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual('http://localhost:3000/classes');
    });
  });

  describe('Class delete & logout functionality', () => {
    it('Should delete correctly the last added class', async () => {
      await expect(ClassesTable.tableList).toBeDisplayed();
      const deleteIconsArray = await ClassesTable.allDeleteIcons;
      const addedClassDeleteIcon = await deleteIconsArray[deleteIconsArray.length - 1];

      await addedClassDeleteIcon.click();

      await expect(ClassesForm.confirmModalTitle).toBeDisplayed();
      await ClassesForm.submitModal();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 5000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('Class deleted');
    });

    it('Admin should logout correctly', async () => {
      await expect(NavBar.logoutBtn).toBeDisplayed();

      await NavBar.logoutBtn.scrollIntoView();

      await NavBar.logoutBtnClick();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 5000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('See you later');

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('http://localhost:3000/');
      await expect(HomePage.homeTitle).toHaveTextContaining('Home');
    });
  });
});
