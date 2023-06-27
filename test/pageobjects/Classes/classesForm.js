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

  get selectTrainerInput() {
    return $('[data-testid="classes-form-container"] > div:nth-child(2) input');
  }

  get selectDayInput() {
    return $('[data-testid="classes-form-container"] > div:nth-child(3) input');
  }

  get selectTimeInput() {
    return $('[data-testid="classes-form-container"] input[type="time"]');
  }

  get selectCapacityInput() {
    return $('[data-testid="classes-form-container"] input[type="number"]');
  }

  get errorMessages() {
    return $$('[data-testid="classes-form-container"] p');
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
