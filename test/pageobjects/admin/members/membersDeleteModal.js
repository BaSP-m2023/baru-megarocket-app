class MembersDeleteModal {
  get modalTitle() {
    return $(
      'body > div.modalConfirm_modal__PlIno > div > div.modalConfirm_modalHeader__rcIHu > span:nth-child(1)'
    );
  }

  get crossBtn() {
    return $(
      'body > div.modalConfirm_modal__PlIno > div > div.modalConfirm_modalHeader__rcIHu > span.modalConfirm_modalCloser__a\\+QEL'
    );
  }

  get cancelBtn() {
    return $(
      'body > div.modalConfirm_modal__PlIno > div > div.modalConfirm_modalButtons__J4uZX > div:nth-child(1) > button'
    );
  }

  get deleteBtn() {
    return $(
      'body > div.modalConfirm_modal__PlIno > div > div.modalConfirm_modalButtons__J4uZX > div:nth-child(2) > button'
    );
  }

  async crossBtnClick() {
    await this.crossBtn.click();
  }

  async cancelBtnClick() {
    await this.cancelBtn.click();
  }

  async deleteBtnClick() {
    await this.deleteBtn.click();
  }
}
export default MembersDeleteModal;
