const HomePage = require('../../pageobjects/Home/homePage');
const LoginPage = require('../../pageobjects/Login/loginPage');
const NavBar = require('../../pageobjects/Shared/navBarComponent');
const Members = require('../pageobjects/members/members');
const MembersEditModal = require('../pageobjects/members/membersEditModal');
// const MembersDeleteModal = require('../pageobjects/members/membersDeleteModal');
const ResponseModal = require('../../pageobjects/Shared/responseModalComponent');
const navBarComponent = require('../../pageobjects/Shared/navBarComponent');

let currentUrl = '';
const validEmail = 'secondadmin@gmail.com';
const validPassword = 'Abc123456';

describe('Admin Member CRUD', () => {
  describe('Admin Login', () => {
    beforeAll('Open browser Url', () => {
      browser.setWindowSize(1920, 1080);
      browser.url('https://baru-megarocket-app.vercel.app/');
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
      await expect(NavBar.logoutBtn).toBeDisplayed();
    });
  });

  describe('Member panel functionality', () => {
    it('Should navigate to members table', async () => {
      await navBarComponent.navigateToMembers();
      await expect(Members.memberPageTitle).toBeDisplayed({ timeout: 2000 });
      await expect(Members.memberPageTitle).toHaveTextContaining('Members');
      await expect(Members.firstMemberInTable).toBeDisplayed();
      await expect(Members.searchMembersField).toBeDisplayed({ timeout: 2000 });
    });

    it('Should find in the filter a specific member', async () => {
      await Members.searchMembersFieldClick();
      await Members.searchMembersInputValue('beto');
      await expect(Members.firstMemberInTable).toHaveTextContaining('beto');
    });

    it('Should edit a member membership status', async () => {
      await Members.membershipBtnClick();
      await expect(Members.modalMembershipTitle).toBeDisplayed({ timeout: 2000 });
      await expect(Members.modalMembershipTitle).toHaveTextContaining('Active Status');
      await expect(Members.modalMembershipCancelBtn).toBeDisplayed();
      await expect(Members.modalMembershipSubmitBtn).toBeDisplayed();
      await Members.modalMembershipSubmitBtnClick();
    });

    describe('Edit member data', () => {
      it('Should find in the filter a specific member', async () => {
        await Members.searchMembersFieldClick();
        await Members.searchMembersInputValue('beto');
        await expect(Members.firstMemberInTable).toHaveTextContaining('beto');
      });

      it('Should open edit panel', async () => {
        await Members.editMembersBtnClick();
        await expect(MembersEditModal.memberPageTitle).toBeDisplayed({ timeout: 2000 });
        await expect(MembersEditModal.memberPageTitle).toHaveTextContaining('Edit a member');
        await expect(MembersEditModal.firstNameInput).toBeDisplayed();
      });

      it('Should edit a member', async () => {
        // await expect(MembersEditModal.firstNameInput).toBeDisplayed();
        // await MembersEditModal.firstNameInputValue('betito');
        await MembersEditModal.editBtnClick();
        await expect(MembersEditModal.editModalTitle).toBeDisplayed({ timeout: 2000 });
        // await expect(MembersEditModal.editModalTitle).toHaveTextContaining('Edit member');
        // await expect(MembersEditModal.cancelModalBtn).toBeDisplayed();
        // await expect(MembersEditModal.submitModalBtn).toBeDisplayed();
        // await MembersEditModal.submitModalBtnClick();
      });
    });

    // it('Should be able to delete', async () => {
    //   await expect(Members.deleteMembersBtn).toBeDisplayed();
    //   await Members.deleteMembersBtnClick();
    //   await expect(MembersDeleteModal.modalTitle).toBeDisplayed({ timeout: 2000 });
    //   await expect(MembersDeleteModal.modalTitle).toHaveTextContaining('Delete member');
    //   await expect(MembersDeleteModal.cancelBtn).toBeDisplayed();
    //   await expect(MembersDeleteModal.deleteBtn).toBeDisplayed();
    // await MembersDeleteModal.deleteBtnClick();
    // });
  });
});
