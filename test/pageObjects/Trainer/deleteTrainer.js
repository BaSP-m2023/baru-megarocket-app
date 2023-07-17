class DeleteTrainer {
  get deleteBtn() {
    return $('[data-testid="trainers-list"] td:nth-child(7) > div > img');
  }

  get deleteAlert() {
    return $('[data-testid="confirm-modal-container"]');
  }

  get deleteConfirmBtn() {
    return $('[data-testid="confirm-modal-container"] div >div:nth-child(2) button');
  }

  async DeleteBtnClick() {
    await this.deleteBtn.click();
  }

  async DeleteConfirmBtnClick() {
    await this.deleteConfirmBtn.click();
  }
}

module.exports = new DeleteTrainer();
