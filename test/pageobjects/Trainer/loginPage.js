class Login {
  get logoContainer() {
    return $("[data-testid='logo-container']");
  }

  get loginBtn() {
    return $("[data-testid='home-buttons-container']> div:nth-child(2) > button");
  }

  get loginDataContainer() {
    return $("[data-testid='login-title-container']");
  }

  get loginEmailInput() {
    return $("[data-testid='login-email-container']> input");
  }

  get loginPassInput() {
    return $('input[name="password"]');
  }

  get loginGreenBtn() {
    return $("[data-testid='login-form-buttons-container']> div > button");
  }

  get homePageBtn() {
    return $("[data-testid='login-form-buttons-container']> a > div > button");
  }
}

module.exports = new Login();
