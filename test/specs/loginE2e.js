const LoginPage = require('../pageObjects/loginPage');
const addNewTrainer = require('../pageObjects/Trainer/addNewTrainer');
const AddNewTrainer = require('../pageObjects/Trainer/addNewTrainer');
const deleteTrainer = require('../pageObjects/Trainer/deleteTrainer');
const EditTrainer = require('../pageObjects/Trainer/editTrainer');

describe('Trainer', () => {
  beforeAll('browser', () => {
    browser.url('http://localhost:3000/');
  });
  describe('Log in into the home page', () => {
    it('click on log in button', async () => {
      await expect(LoginPage.loginbtn).toBeDisplayed();
      await LoginPage.loginBtnClick();
    });
    it('Open the log in screen', async () => {
      await expect(browser).toHaveUrl('http://localhost:3000/auth/login');
    });
    it('complete fields', async () => {
      await LoginPage.login('secondadmin@gmail.com', 'Abc123456');
    });
    it('Open the home screen', async () => {
      await expect(browser).toHaveUrl('http://localhost:3000/user/admin/home');
    });
    it('Login successful and open the screen for trainers', async () => {
      await expect(LoginPage.confirmLogin).toBeDisplayed();
    });
    it('click on trainers button', async () => {
      await expect(AddNewTrainer.trainerbtn).toBeDisplayed();
      await AddNewTrainer.trainerbtnClick();
    });
  });
  describe('add new trainers', () => {
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
    it('add new trainer button', async () => {
      await expect(AddNewTrainer.submitBtn).toBeDisplayed();
      await AddNewTrainer.SubmitBtnClick();
    });
    it('Confirm alert of submit', async () => {
      await expect(AddNewTrainer.confirmAlert).toBeDisplayed();
    });
    it('confirm and click on submit', async () => {
      await expect(AddNewTrainer.submitConfirmBtn).toBeDisplayed();
      await AddNewTrainer.SubmitConfirmBtnClick();
    });
  });
  describe('Edit Trainer', () => {
    it('Click on edit button', async () => {
      await expect(EditTrainer.editBtn).toBeDisplayed({ timeout: 2000 });
      await EditTrainer.EditBtnClick();
    });
    it('edit id', async () => {
      await EditTrainer.completeForm('5569887745');
    });
    it('Update click button', async () => {
      await expect(EditTrainer.updateBtn).toBeDisplayed();
      await EditTrainer.UpdateBtnClick();
    });
    it('submit click button', async () => {
      await expect(addNewTrainer.submitConfirmBtn).toBeDisplayed();
      await addNewTrainer.SubmitConfirmBtnClick();
    });
    it('Cancel click button', async () => {
      await expect(EditTrainer.cancelBtn).toBeDisplayed();
      await EditTrainer.cancelBtnClick();
    });
  });
  describe('Delete Trainer', () => {
    it('Click on Delete button', async () => {
      await expect(deleteTrainer.deleteBtn).toBeDisplayed();
      await deleteTrainer.DeleteBtnClick();
    });
    it('confirmation of delete', async () => {
      await expect(deleteTrainer.deleteAlert).toBeDisplayed();
    });
    it('delete click button', async () => {
      await expect(deleteTrainer.deleteConfirmBtn).toBeDisplayed();
      await deleteTrainer.DeleteConfirmBtnClick();
    });
  });
});
