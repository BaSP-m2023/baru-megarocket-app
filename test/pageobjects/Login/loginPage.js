class LoginPage {
  get loginTitle() {
    return $('[data-testid="login-title-container"] > h3');
  }

  get emailInput() {
    return $('[data-testid="login-email-container"] [name="email"]');
  }

  get passwordInput() {
    return $('[data-testid="login-password-container"] [name="password"]');
  }

  get loginErrors() {
    return $$('form p');
  }

  get loginBtn() {
    return $('[data-testid="login-form-buttons-container"] > div > button');
  }

  async enterEmail(value) {
    await this.emailInput.setValue(value);
  }

  async enterPassword(value) {
    await this.passwordInput.setValue(value);
  }

  async loginBtnClick() {
    await this.loginBtn.click();
  }
}

module.exports = new LoginPage();
