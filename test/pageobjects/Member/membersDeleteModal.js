class MembersDeleteModal {
  get modalTitle() {
    return $('[data-testid="confirm-modal-container"] >div > span');
  }

  get cancelBtn() {
    return $('[data-testid="confirm-modal-buttons"] > div:nth-child(1) > button');
  }

  get deleteBtn() {
    return $('[data-testid="confirm-modal-buttons"] > div:nth-child(2) > button');
  }

  async cancelBtnClick() {
    await this.cancelBtn.click();
  }

  async deleteBtnClick() {
    await this.deleteBtn.click();
  }
}
module.exports = new MembersDeleteModal();
