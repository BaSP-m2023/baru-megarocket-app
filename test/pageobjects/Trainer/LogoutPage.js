class Logout {
  get LogOutBtn() {
    return $('[data-testid="logout-btn"]');
  }
}

module.exports = new Logout();
