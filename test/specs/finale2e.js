const HomePage = require('../pageobjects/Home/homePage');
const LoginPage = require('../pageobjects/Login/loginPage');
const NavBar = require('../pageobjects/Shared/navBarComponent');
const AdminsTable = require('../pageobjects/Admins/adminsTable');
const AdminsForm = require('../pageobjects/Admins/adminsForm');
const ResponseModal = require('../pageobjects/Shared/responseModalComponent');
const AddNewTrainer = require('../pageObjects/Trainer/addNewTrainer');
const ActivitiesPage = require('../pageobjects/Admins/ActivitiesPage');
const ClassesTable = require('../pageobjects/Classes/classesTable');
const SchedulePage = require('../pageobjects/Member/SchedulePage');
const DeleteTrainer = require('../pageObjects/Trainer/deleteTrainer');

let currentUrl = '';
const superadminEmail = 'superadmin2@gmail.com';
const validPassword = 'Abc123456';

describe('Application E2E', () => {
  describe('Superadmin functionality', () => {
    beforeAll('Open Browser Url', () => {
      browser.url('https://baru-megarocket-app.vercel.app/');
      browser.setWindowSize(1920, 1080);
    });

    it('Should navigate correctly to login page', async () => {
      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.loginBtn).toBeDisplayed();

      await HomePage.loginBtnClick();

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/auth/login');
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
      await LoginPage.enterEmail(superadminEmail);
      await LoginPage.enterPassword('asdasd12');
      await LoginPage.loginBtnClick();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 5000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('Wrong email or password');
    });

    it('Should login correctly with valid credentials', async () => {
      await LoginPage.enterEmail(superadminEmail);
      await LoginPage.enterPassword(validPassword);
      await LoginPage.loginBtnClick();

      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
      await expect(NavBar.adminsLink).toBeDisplayed();
      await expect(NavBar.logoutBtn).toBeDisplayed();
    });

    it('Should navigate correctly to admins table view', async () => {
      await NavBar.navigateToAdmins();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual(
        'https://baru-megarocket-app.vercel.app/user/super-admin/admins'
      );

      await expect(AdminsTable.searchInput).toBeDisplayed();
      await expect(AdminsTable.tableList).toBeDisplayed();
      await expect(AdminsTable.addNewBtn).toBeDisplayed();
      await expect(AdminsTable.adminsTitle).toHaveTextContaining('Admins');
    });

    it('Should give an error when trying to create a new admin with empty credentials', async () => {
      await AdminsTable.clickAddNewBtn();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual(
        'https://baru-megarocket-app.vercel.app/user/super-admin/admins/add'
      );
      await expect(AdminsForm.formTitle).toHaveTextContaining('Add admin');
      await expect(AdminsForm.form).toBeDisplayed();

      await AdminsForm.submitBtn.scrollIntoView();
      await AdminsForm.submitForm();
      // await AdminsForm.confirmModalCancelBtn.click();
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
      await ResponseModal.modalText.waitForDisplayed({ reverse: true });

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual(
        'https://baru-megarocket-app.vercel.app/user/super-admin/admins'
      );
    });

    it('Superadmin should logout correctly', async () => {
      await expect(NavBar.logoutBtn).toBeDisplayed();

      await NavBar.logoutBtn.scrollIntoView();

      await NavBar.logoutBtnClick();

      await expect(ResponseModal.modalText).toBeDisplayed();
      await expect(ResponseModal.modalText).toHaveTextContaining('See you later');

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/');
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
    });
  });

  describe('Admin Create functionality', () => {
    it('Should navigate correctly to login page', async () => {
      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.loginBtn).toBeDisplayed();

      await HomePage.loginBtnClick();

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/auth/login');
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
      await LoginPage.enterEmail('riedo@gmail.com');
      await LoginPage.enterPassword('Julian123');
      await LoginPage.loginBtnClick();

      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
      await expect(NavBar.classesLink).toBeDisplayed();
      await expect(NavBar.logoutBtn).toBeDisplayed();
    });

    it('click on trainers button', async () => {
      await expect(AddNewTrainer.trainerbtn).toBeDisplayed();
      await AddNewTrainer.trainerbtnClick();
    });

    it('add new trainer button', async () => {
      await expect(AddNewTrainer.addNewbtn).toBeDisplayed();
      await AddNewTrainer.AddNewbtnbtnClick();
    });
    it('complete fields', async () => {
      await AddNewTrainer.completeForm(
        'Jose',
        'Probados',
        '45798566',
        '3441568989',
        'joseprueba@gmail.com',
        'Pruebados123',
        '25000'
      );
    });
    it('add new trainer button confirm', async () => {
      await expect(AddNewTrainer.submitBtn).toBeDisplayed();
      await AddNewTrainer.SubmitBtnClick();
    });
    it('Confirm alert of submit', async () => {
      await expect(AddNewTrainer.confirmAlert).toBeDisplayed();
    });
    it('confirm and click on submit', async () => {
      await expect(AddNewTrainer.submitConfirmBtn).toBeDisplayed();
      await AddNewTrainer.SubmitConfirmBtnClick();
      await expect(ResponseModal.modalText).toBeDisplayed();
      await expect(ResponseModal.modalText).toHaveTextContaining('Trainer created');
      await ResponseModal.modalText.waitForDisplayed({ reverse: true });
    });
    it('admin should be able to add a new activity', async () => {
      await ActivitiesPage.ActivitiesNavBar.click();
      await ActivitiesPage.ActivitiesAddNew.click();
      await expect(ActivitiesPage.ActivitiesAddTitle).toBeDisplayed();
      await ActivitiesPage.ActivitiesAddName.setValue('Boxing');
      await ActivitiesPage.ActivitiesAddTrainerSelector.click();
      await ActivitiesPage.ActivitiesAddTrainerSelector.setValue('Jose Probados');
      await browser.keys(['Enter']);
      await ActivitiesPage.ActivitiesAddDescription.setValue(
        'a new description made for boxing activity'
      );
      await ActivitiesPage.ActivitiesSubmitBtn.click();
      await ActivitiesPage.ActivitiesModal.click();
    });

    it('Should navigate correctly to classes table view', async () => {
      await NavBar.navigateToClasses();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/user/admin/classes');

      await expect(ClassesTable.filterByActivityInput).toBeDisplayed();
      await expect(ClassesTable.filterByTrainerInput).toBeDisplayed();
      await expect(ClassesTable.tableList).toBeDisplayed();
    });

    it('Should give an error when trying to create a new class with empty info', async () => {
      const emptyHoursArray = await ClassesTable.lastEmptyHours;
      const lastEmptyHour = await emptyHoursArray[emptyHoursArray.length - 1];
      await lastEmptyHour.scrollIntoView();
      await lastEmptyHour.click();

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

      await expect(ResponseModal.modalText).toBeDisplayed();
      await expect(ResponseModal.modalText).toHaveTextContaining('Class created successfully');
      await ResponseModal.modalText.waitForDisplayed({ reverse: true });
      await expect(ClassesTable.tableList).toBeDisplayed();
      await expect(ClassesTable.filterByActivityInput).toBeDisplayed();
      await expect(ClassesTable.filterByTrainerInput).toBeDisplayed();
    });

    it('Admin should logout correctly', async () => {
      await expect(NavBar.logoutBtn).toBeDisplayed();

      await NavBar.logoutBtn.scrollIntoView();

      await NavBar.logoutBtnClick();

      await ResponseModal.modalText.waitForDisplayed({ timeout: 5000 });
      await expect(ResponseModal.modalText).toHaveTextContaining('See you later');

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/');
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
    });
  });

  describe('Member functionality', () => {
    it('Should navigate correctly to login page', async () => {
      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.loginBtn).toBeDisplayed();

      await HomePage.loginBtnClick();

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/auth/login');
      await expect(LoginPage.loginTitle).toBeDisplayed();
      await expect(LoginPage.emailInput).toBeDisplayed();
      await expect(LoginPage.passwordInput).toBeDisplayed();
    });

    it('Should login correctly with valid credentials', async () => {
      await LoginPage.enterEmail('firstmember1@gmail.com');
      await LoginPage.enterPassword(validPassword);
      await LoginPage.loginBtnClick();

      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
      await expect(NavBar.logoutBtn).toBeDisplayed();
    });

    it('user should be able to subscribe to an activity', async () => {
      await SchedulePage.ScheduleNavBar.click();
      await SchedulePage.allActivities.scrollIntoView();
      await SchedulePage.allActivities.click();
      await SchedulePage.subscribeBtn.click();
    });

    it('user should logout correctly', async () => {
      await expect(NavBar.logoutBtn).toBeDisplayed();

      await NavBar.logoutBtn.scrollIntoView();

      await NavBar.logoutBtnClick();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/');
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
    });
  });

  describe('Admin Delete functionality', () => {
    it('Should navigate correctly to login page', async () => {
      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.loginBtn).toBeDisplayed();

      await HomePage.loginBtnClick();

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/auth/login');
      await expect(LoginPage.loginTitle).toBeDisplayed();
      await expect(LoginPage.emailInput).toBeDisplayed();
      await expect(LoginPage.passwordInput).toBeDisplayed();
    });

    it('Should login correctly with valid credentials', async () => {
      await LoginPage.enterEmail('riedo@gmail.com');
      await LoginPage.enterPassword('Julian123');
      await LoginPage.loginBtnClick();

      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
      await expect(NavBar.classesLink).toBeDisplayed();
      await expect(NavBar.logoutBtn).toBeDisplayed();
    });

    it('Should navigate correctly to classes table view', async () => {
      await NavBar.navigateToClasses();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/user/admin/classes');

      await expect(ClassesTable.filterByActivityInput).toBeDisplayed();
      await expect(ClassesTable.filterByTrainerInput).toBeDisplayed();
      await expect(ClassesTable.tableList).toBeDisplayed();
    });

    it('Should filter and delete previously updated class', async () => {
      await ClassesTable.filterActivity('Boxing');
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
      await ResponseModal.modalText.waitForDisplayed({ reverse: true });
      await expect(ClassesTable.tableList).toBeDisplayed();

      const isExisting = await previouslyAddedClass.isExisting();
      await expect(isExisting).toBe(false);
    });

    it('should navigate and delete activity', async () => {
      await ActivitiesPage.ActivitiesNavBar.click();
      await expect(ActivitiesPage.ActivitesFilter).toBeDisplayed();
      await ActivitiesPage.ActivitesFilter.setValue('Boxing');
      await ActivitiesPage.ActivitiesDeleteIcon.click();
      await expect(ActivitiesPage.ActivitiesModal).toBeDisplayed();
      await ActivitiesPage.ActivitiesDeleteBtn.click();
      await expect(browser).toHaveUrl(
        'https://baru-megarocket-app.vercel.app/user/admin/activities'
      );
    });

    it('should navigate and delete trainer', async () => {
      await expect(AddNewTrainer.trainerbtn).toBeDisplayed();
      await AddNewTrainer.trainerbtnClick();
      await expect(AddNewTrainer.trainerFilter).toBeDisplayed();
      await AddNewTrainer.trainerFilter.setValue('Probados');
      await expect(DeleteTrainer.deleteBtn).toBeDisplayed();
      await DeleteTrainer.DeleteBtnClick();
      await expect(DeleteTrainer.deleteAlert).toBeDisplayed();
      await expect(DeleteTrainer.deleteConfirmBtn).toBeDisplayed();
      await DeleteTrainer.DeleteConfirmBtnClick();
    });

    it('should logout correctly', async () => {
      await expect(NavBar.logoutBtn).toBeDisplayed();

      await NavBar.logoutBtn.scrollIntoView();

      await NavBar.logoutBtnClick();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/');
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
    });
  });

  describe('Superadmin Delete functionality', () => {
    it('Should navigate correctly to login page', async () => {
      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.loginBtn).toBeDisplayed();

      await HomePage.loginBtnClick();

      currentUrl = await browser.getUrl();
      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/auth/login');
      await expect(LoginPage.loginTitle).toBeDisplayed();
      await expect(LoginPage.emailInput).toBeDisplayed();
      await expect(LoginPage.passwordInput).toBeDisplayed();
    });

    it('Should login correctly with valid credentials', async () => {
      await LoginPage.enterEmail(superadminEmail);
      await LoginPage.enterPassword(validPassword);
      await LoginPage.loginBtnClick();

      await expect(HomePage.homeTitle).toBeDisplayed();
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
      await expect(NavBar.adminsLink).toBeDisplayed();
      await expect(NavBar.logoutBtn).toBeDisplayed();
    });

    it('Should navigate correctly to admins table view', async () => {
      await NavBar.navigateToAdmins();

      currentUrl = await browser.getUrl();

      await expect(currentUrl).toEqual(
        'https://baru-megarocket-app.vercel.app/user/super-admin/admins'
      );

      await expect(AdminsTable.searchInput).toBeDisplayed();
      await expect(AdminsTable.tableList).toBeDisplayed();
      await expect(AdminsTable.addNewBtn).toBeDisplayed();
      await expect(AdminsTable.adminsTitle).toHaveTextContaining('Admins');
    });

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

      await expect(currentUrl).toEqual('https://baru-megarocket-app.vercel.app/');
      await expect(HomePage.homeTitle).toHaveTextContaining('MegaRocket Web');
    });
  });
});
