class NavBar {
  get adminsLink() {
    return $('[data-testid="routes-list"] a[href="/user/super-admin/admins"]');
  }

  get classesLink() {
    return $('[data-testid="routes-list"] a[href="/user/admin/classes"]');
  }

  get membersLink() {
    return $('[data-testid="routes-list"] a[href="/user/admin/members"]');
  }

  get subscriptionsLink() {
    return $('[data-testid="routes-list"] a[href="/user/admin/subscriptions"]');
  }

  get logoutBtn() {
    return $('header > div > div:last-child > div button');
  }

  async navigateToAdmins() {
    await this.adminsLink.click();
  }

  async navigateToClasses() {
    await this.classesLink.click();
  }

  async navigateToMembers() {
    await this.membersLink.click();
  }

  async navigateToSubscriptions() {
    await this.subscriptionsLink.click();
  }

  async logoutBtnClick() {
    await this.logoutBtn.click();
  }
}

module.exports = new NavBar();
