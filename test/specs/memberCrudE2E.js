const HomePage = require('../pageobjects/admin/home/homePage');
const LoginPage = require('../pageobjects/admin/login/loginPage');
const Members = require('../pageobjects/admin/members/members');
const MembersCreateModal = require('../pageobjects/admin/members/membersCreateModal');
const MembersDeleteModal = require('../pageobjects/admin/members/membersDeleteModal');

const validEmail = 'secondadmin@gmail.com';
const validPassword = 'Abc123456';

describe('Admin Member CRUD', () => {
  describe('Admin Login'),
    () => {
      beforeAll('Open browser Url', () => {
        browser.setWindowSize(1920, 1080);
        browser.url('https://baru-megarocket-app.vercel.app/login');
      });

      it('Should have an error when trying to login with empty credentials', async () => {
        await LoginPage.loginBtnClick();

        await expect(LoginPage.loginErrors).toBeElementsArrayOfSize(2);
        const emailError = await LoginPage.loginErrors[0];
        const passwordError = await LoginPage.loginErrors[1];

        await expect(emailError).toHaveTextContaining('Email is required');
        await expect(passwordError).toHaveTextContaining('Password is required');
      });

      it('Should login correcltly with valid credentials', async () => {
        await LoginPage.enterEmail(validEmail);
        await LoginPage.enterPassword(validPassword);
        await LoginPage.loginBtnClick();

        await expect(HomePage.homeTitle).waitForDisplayed({ timeout: 2000 });
      });
    };

  describe('Member panel functionality', () => {
    it('Should navigate to members table', async () => {
      await expect(Members.memberPageTitle).waitForDisplayed({ timeout: 2000 });
      await expect(Members.memberPageTitle).toHaveTextContaining('Members');
      await expect(Members.firstMemberInTable).waitForDisplayed({ timeout: 2000 });
      await expect(Members.addMembersBtn).waitForDisplayed({ timeout: 2000 });
      await expect(Members.searchMembersField).waitForDisplayed({ timeout: 2000 });
    });
    it('should create a new member', async () => {
      await Members.addMembersBtnClick();
      await expect(MembersCreateModal.membersCreateModalTitle).waitForDisplayed({ timeout: 2000 });
      await expect(MembersCreateModal.membersCreateModalTitle).toHaveTextContaining(
        'Create a new member'
      );
      await MembersCreateModal.fillMembersCreateModalForm(
        'testName',
        'testLastName',
        '123456789',
        '1231231233',
        'cityTest',
        '2220',
        'emailTest@gmail.com',
        'Ab123456',
        true,
        'classic'
      );
      await MembersCreateModal.membersCreateModalSubmitBtnCLick();
      await expect(MembersCreateModal.addMemberModalConfirmation).waitForDisplayed({
        timeout: 2000
      });
      await MembersCreateModal.addMemberModalConfirmationBtnClick();
    });
    it('Should find on filter', async () => {
      await expect(Members.searchMembersField).waitForDisplayed({ timeout: 2000 });
      await Members.searchMembersInputValue('testName');
      await expect(Members.firstMemberInTable).toHaveTextContaining('testName');
    });
    it('Should be able to delete', async () => {
      await expect(Members.deleteMembersBtn).toBeDisplayed();
      await Members.deleteMembersBtnClick();
      await expect(MembersDeleteModal.modalTitle).waitForDisplayed({ timeout: 2000 });
      await expect(MembersDeleteModal.deleteBtn).waitForDisplayed({ timeout: 2000 });
      await MembersDeleteModal.deleteBtnClick();
    });
  });
});
