class Login {
  get logoContainer() {
    return $("[data-testid='logo-container']");
  }

  get loginBtn() {
    return $("[data-testid='routes-list']> li:nth-child(3)");
  }

  get loginDataContainer() {
    return $("[data-testid='login-title-container']");
  }

  get loginEmailContainer() {
    return $("[data-testid='login-email-container']");
  }

  get loginEmailInput() {
    return $("[data-testid='login-email-container']> input");
  }

  get loginPasswordContainer() {
    return $("[data-testid='login-password-container']");
  }

  get loginPassInput() {
    return $("[data-testid='login-password-input']> input");
  }

  get loginGreenBtn() {
    return $("[data-testid='login-form-buttons-container']> div > button");
  }

  get homePage() {
    return $("[data-testid='routes-list']");
  }
}

module.exports = new Login();
// export default new Login();
