class LoginPage {
  get loginbtn() {
    return $('[data-testid="home-buttons-container"] div:nth-child(2) button');
  }

  get inputEmail() {
    return $('[data-testid="login-email-container"] input');
  }

  get inputPassword() {
    return $('[data-testid="login-password-container"] input');
  }

  get loginbtn2() {
    return $('[data-testid="login-form-buttons-container"] div:nth-child(1) button');
  }

  get confirmLogin() {
    return $('[data-testid="logo-container"]');
  }

  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.loginbtn2.click();
  }

  async loginBtnClick() {
    await this.loginbtn.click();
  }
}
module.exports = new LoginPage();
