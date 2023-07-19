class Members {
  get memberPageTitle() {
    return $('#root > div > div > section > h1');
  }

  get firstMemberInTable() {
    return $('[data-testid="members-list"] > tr:nth-child(1) > td:nth-child(1)');
  }

  get searchMembersField() {
    return $('[data-testid="members-search-container"]');
  }

  get searchMembersInput() {
    return $('[data-testid="members-search-container"] > input');
  }

  get membershipBtn() {
    return $('[data-testid="members-list"] > tr:nth-child(1) > td:nth-child(2) > label');
  }

  get editMembersBtn() {
    return $('[data-testid="members-list"] > tr:nth-child(1) > td:nth-child(4)');
  }

  get deleteMembersBtn() {
    return $('[data-testid="members-list"] > tr:nth-child(1) > td:nth-child(5)');
  }

  get modalMembershipTitle() {
    return $('[data-testid="confirm-modal-container"] > div > span');
  }

  get modalMembershipCancelBtn() {
    return $('[data-testid="confirm-modal-buttons"] > div:nth-child(1)');
  }

  get modalMembershipSubmitBtn() {
    return $('[data-testid="confirm-modal-buttons"] > div:nth-child(2)');
  }

  async searchMembersFieldClick() {
    await this.searchMembersField.click();
  }

  async searchMembersInputValue(value) {
    await this.searchMembersInput.setValue(value);
  }

  async membershipBtnClick() {
    await this.membershipBtn.click();
  }

  async editMembersBtnClick() {
    await this.editMembersBtn.click();
  }

  async deleteMembersBtnClick() {
    await this.deleteMembersBtn.click();
  }
  async modalMembershipCancelBtnClick() {
    await this.modalMembershipCancelBtn.click();
  }

  async modalMembershipSubmitBtnClick() {
    await this.modalMembershipSubmitBtn.click();
  }
}

module.exports = new Members();
