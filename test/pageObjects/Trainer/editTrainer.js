class EditTrainer {
  get editBtn() {
    return $('[data-testid="trainers-list"] div:nth-child(1) img');
  }

  get inputPassword() {
    return $('[data-testid="trainers-form-container"]> div:nth-child(6) > input');
  }

  get updateBtn() {
    return $('[data-testid="trainers-form-buttons"]  div:nth-child(2) > button');
  }

  get cancelBtn() {
    return $('[data-testid="trainers-form-buttons"]  div:nth-child(1) > button');
  }

  async EditBtnClick() {
    await this.editBtn.click();
  }

  async completeForm(Password) {
    await this.inputPassword.setValue(Password);
  }

  async UpdateBtnClick() {
    await this.updateBtn.click();
  }

  async CancelBtnClick() {
    await this.cancelBtn.click();
  }
}

module.exports = new EditTrainer();
