class ClassesForm {
  get formTitle() {
    return $('[data-testid="classes-form-title-container"] > h2');
  }

  get form() {
    return $('[data-testid="classes-form-container"]');
  }

  get selectActivityInput() {
    return $('[data-testid="classes-form-container"] input[role="combobox"]');
  }

  get firstActivityOption() {
    return $('[data-testid="classes-form-container"] div > div > div > div > div');
  }

  get selectTrainerInput() {
    return $('[data-testid="classes-form-container"] > div:nth-child(2) input');
  }

  get firstTrainerOption() {
    return $('[data-testid="classes-form-container"] > div:nth-child(2) > div > div > div > div');
  }

  get selectDayInput() {
    return $('[data-testid="classes-form-container"] > div:nth-child(3) input');
  }

  get firstDayOption() {
    return $('[data-testid="classes-form-container"] > div:nth-child(3) > div > div > div > div');
  }

  get selectTimeInput() {
    return $('[data-testid="classes-form-container"] input[type="time"]');
  }

  get capacityInput() {
    return $('[data-testid="classes-form-container"] input[type="number"]');
  }

  async enterActivity(value) {
    await this.selectActivityInput.setValue(value);
  }

  async enterTrainer(value) {
    await this.selectTrainerInput.setValue(value);
  }

  async enterDay(value) {
    await this.selectDayInput.setValue(value);
  }

  async enterTime(value) {
    await this.selectTimeInput.setValue(value);
  }

  async enterCapacity(value) {
    await this.capacityInput.setValue(value);
  }

  get errorMessage() {
    return $('[data-testid="classes-form-container"] div > span');
  }

  get submitBtn() {
    return $('[data-testid="classes-form-container"] > div:last-child > div:last-child > button');
  }

  get cancelBtn() {
    return $('[data-testid="classes-form-container"] > div:last-child > div > button');
  }

  get resetBtn() {
    return $('section > div:last-child > div > button');
  }

  get confirmModalTitle() {
    return $('[data-testid="confirm-modal-container"] > div > span');
  }

  get confirmModalSubmitBtn() {
    return $('[data-testid="confirm-modal-buttons"] > div:last-child > button');
  }

  async submitForm() {
    await this.submitBtn.click();
  }

  async resetForm() {
    await this.resetBtn.click();
  }

  async cancelForm() {
    await this.cancelBtn.click();
  }

  async submitModal() {
    await this.confirmModalSubmitBtn.click();
  }
}

module.exports = new ClassesForm();
