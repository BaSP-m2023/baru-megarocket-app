class Logout {
  get LogOutBtn() {
    return $('header > div > div:last-child > div button');
  }
}

module.exports = new Logout();
