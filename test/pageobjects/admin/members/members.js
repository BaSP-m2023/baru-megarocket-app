class Members {
  get memberPageTitle() {
    return $('#root > div > div > section > h1');
  }

  get firstMemberInTable() {
    return $('[data-testid="members-list"] > tr:nth-child(1) > td:nth-child(1)');
  }

  get addMembersBtn() {
    return $('[data-testid="add-member-link"] > div > button');
  }

  get searchMembersField() {
    return $('[data-testid="members-search-container"]');
  }

  get searchMembersInput() {
    return $('[data-testid="members-search-container"] > input');
  }

  get editMembersBtn() {
    return $('[data-testid="members-list"] > tr:nth-child(1) > td:nth-child(3) > a');
  }

  get deleteMembersBtn() {
    return $('[data-testid="members-list"] > tr:nth-child(1) > td:nth-child(4) > div > img');
  }

  async addMembersBtnClick() {
    await this.addMembersBtn.click();
  }

  async searchMembersFieldClick() {
    await this.searchMembersField.click();
  }

  async searchMembersInputValue(value) {
    await this.searchMembersInput.setValue(value);
  }

  async editMembersBtnClick() {
    await this.editMembersBtn.click();
  }

  async deleteMembersBtnClick() {
    await this.deleteMembersBtn.click();
  }
}

module.exports = new Members();
