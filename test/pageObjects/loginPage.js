class LoginPage {
  get loginbtn() {
    return $('#root > div > section > div > div:nth-child(2) > button');
  }

  get inputUserName() {
    return $('#user-name');
  }

  get inputPassword() {
    return $('#password');
  }

  get btnSubmit() {
    return $('#login-button');
  }

  get errorAlert() {
    return $('#login_button_container > div > form > div.error-message-container.error > h3');
  }

  async login(username, password) {
    await this.inputUserName.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }
}
module.exports = new LoginPage();
