class DeleteTrainer {
  get deleteBtn() {
    return $('[data-testid="trainers-list"]> tr > td:last-child > svg');
  }

  get deleteAlert() {
    return $('[data-testid="confirm-modal-container"]');
  }

  get deleteConfirmBtn() {
    return $('[data-testid="confirm-modal-buttons"]:last-child > div:last-child > button');
  }

  async DeleteBtnClick() {
    await this.deleteBtn.click();
  }

  async DeleteConfirmBtnClick() {
    await this.deleteConfirmBtn.click();
  }
}

module.exports = new DeleteTrainer();
