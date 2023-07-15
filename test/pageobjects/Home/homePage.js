class HomePage {
  get homeTitle() {
    return $('section > h1');
  }

  get loginBtn() {
    return $('[data-testid="home-buttons-container"] div:last-child button');
  }

  async loginBtnClick() {
    await this.loginBtn.click();
  }
}

module.exports = new HomePage();
