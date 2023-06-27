class AdminsTable {
  get adminsTitle() {
    return $('section > h2');
  }

  get searchInput() {
    return $('[data-testid="admins-search-container"] > [name="search"]');
  }

  get tableList() {
    return $('[data-testid="admins-list"]');
  }

  get addNewBtn() {
    return $('[data-testid="add-admin-link"]');
  }

  async clickAddNewBtn() {
    await this.addNewBtn.click();
  }
}

module.exports = new AdminsTable();
