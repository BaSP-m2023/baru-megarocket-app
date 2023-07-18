class AdminsTable {
  get adminsTitle() {
    return $('section > h2');
  }

  get searchInput() {
    return $('[data-testid="admins-search-container"] > [name="filter-admin"]');
  }

  get tableList() {
    return $('[data-testid="admins-list"]');
  }

  get allEditIcons() {
    return $$('[data-testid="admins-edit-btn"]');
  }

  get allDeleteIcons() {
    return $$('[data-testid="admins-delete-btn"]');
  }

  get lastAdminDNI() {
    return $('[data-testid="admins-list"] > tr:last-child > td:nth-child(3)');
  }

  get addNewBtn() {
    return $('[data-testid="add-admin-link"]');
  }

  async clickAddNewBtn() {
    await this.addNewBtn.click();
  }
}

module.exports = new AdminsTable();
