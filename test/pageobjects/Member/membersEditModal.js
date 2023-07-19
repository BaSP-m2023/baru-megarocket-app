class MembersEditModal {
  get memberPageTitle() {
    return $('[data-testid="members-form-title-container"] > h2');
  }

  get firstNameInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(1) > div:nth-child(1) >input');
  }

  get cancelBtn() {
    return $('[data-testid="members-form-button"] > div:nth-child(1) > button');
  }

  get editBtn() {
    return $('[data-testid="members-form-button"] > div:nth-child(2) > button');
  }

  get editModalTitle() {
    return $('[data-testid="confirm-modal-container"] > div:nth-child(1) > span');
  }

  get cancelModalBtn() {
    return $('[data-testid="confirm-modal-buttons"] > div:nth-child(1) > button');
  }

  get submitModalBtn() {
    return $('[data-testid="confirm-modal-buttons"] > div:nth-child(2) > button');
  }

  async firstNameInputValue(value) {
    await this.firstNameInput.setValue(value);
  }

  async cancelBtnClick() {
    await this.cancelBtn.click();
  }

  async editBtnClick() {
    await this.editBtn.click();
  }

  async cancelModalBtnClick() {
    await this.cancelModalBtn.click();
  }

  async submitModalBtnClick() {
    await this.submitModalBtn.click();
  }
}

module.exports = new MembersEditModal();
