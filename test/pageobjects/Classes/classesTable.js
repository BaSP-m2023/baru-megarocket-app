class ClassesTable {
  get classesTitle() {
    return $('section > h2');
  }

  get searchInput() {
    return $('[data-testid="classes-search"]');
  }

  get tableList() {
    return $('[data-testid="classes-list"]');
  }

  get allEditIcons() {
    return $$('[data-testid="classes-edit-btn"]');
  }

  get allDeleteIcons() {
    return $$('[data-testid="classes-delete-btn"]');
  }

  get addNewBtn() {
    return $('[data-testid="add-class-link"]');
  }

  async clickAddNewBtn() {
    await this.addNewBtn.click();
  }
}

module.exports = new ClassesTable();
