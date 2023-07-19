class EditTrainer {
  get editBtn() {
    return $('[data-testid="trainers-list"] tr:nth-child(2) td:nth-child(6)');
  }

  get inputId() {
    return $('[data-testid="trainers-form-container"] div:nth-child(3) input');
  }

  get updateBtn() {
    return $('[data-testid="trainers-form-buttons"] div:nth-child(2) button');
  }

  get cancelBtn() {
    return $('[data-testid="trainers-form-buttons"] > a > div > button');
  }

  async EditBtnClick() {
    await this.editBtn.click();
  }

  async completeForm(Id) {
    await this.inputId.setValue(Id);
  }

  async UpdateBtnClick() {
    await this.updateBtn.click();
  }

  async cancelBtnClick() {
    await this.cancelBtn.click();
  }
}

module.exports = new EditTrainer();
