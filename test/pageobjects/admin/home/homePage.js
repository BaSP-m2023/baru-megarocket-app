class HomePage {
  get homeTitle() {
    return $('section > h1');
  }

  get loginBtn() {
    return $('[data-testid="home-buttons-container"] > div:last-child > button');
  }

  get membersBtn() {
    return $('[data-testid="routes-list"] > li:nth-child(4) > a');
  }

  get subsriptionsBtn() {
    return $('[data-testid="routes-list"] > li:nth-child(5) > a');
  }

  async loginBtnClick() {
    await this.loginBtn.click();
  }

  async membersBtnClick() {
    await this.membersBtn.click();
  }

  async subsriptionsBtnClick() {
    await this.subsriptionsBtn.click();
  }
}

module.exports = new HomePage();
