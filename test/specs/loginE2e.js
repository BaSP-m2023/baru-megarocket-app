const LoginPage = require('../pageObjects/loginPage');
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
      await expect(browser).toHaveUrl('http://localhost:3000/login');
    });
    it('complete fields', async () => {
      await LoginPage.login('secondadmin@gmail.com', 'Abc123456');
    });
    it('Open the home screen', async () => {
      await expect(browser).toHaveUrl('http://localhost:3000/');
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
        'Matias',
        'Peter',
        '41579722',
        '3329339237',
        'marcos@gmail.com',
        'Casa2020',
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
    it('cancel', async () => {
      await expect(AddNewTrainer.cancelBtn).toBeDisplayed();
      await AddNewTrainer.CancelBtnClick();
    });
  });
  describe('Edit Trainer', () => {
    it('Click on edit button', async () => {
      await expect(EditTrainer.editBtn).toBeDisplayed();
      await EditTrainer.EditBtnClick();
    });
    it('complete fields to edit', async () => {
      await EditTrainer.completeForm('Matias123');
    });
    it('Update click button', async () => {
      await expect(EditTrainer.updateBtn).toBeDisplayed();
      await EditTrainer.UpdateBtnClick();
    });
    it('cancel', async () => {
      await expect(EditTrainer.cancelBtn).toBeDisplayed();
      await EditTrainer.CancelBtnClick();
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
