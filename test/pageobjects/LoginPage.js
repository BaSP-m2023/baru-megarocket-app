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

  get loginEmailContainer() {
    return $("[data-testid='login-email-container']");
  }

  get loginEmailInput() {
    return $("[data-testid='login-email-container']> input");
  }

  get loginPasswordContainer() {
    return $('#root > div > div > section > form > div.login_containerPassword__Nu596');
  }

  get loginPassInput() {
    return $(
      '#root > div > div > section > form > div.login_containerPassword__Nu596 > div.login_inputContainerPassword__rlprR > input'
    );
  }

  get loginGreenBtn() {
    return $("[data-testid='login-form-buttons-container']> div > button");
  }

  get homePageBtn() {
    return $("[data-testid='login-form-buttons-container']> a > div > button");
  }
}

module.exports = new Login();
