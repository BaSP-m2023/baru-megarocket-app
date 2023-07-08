class AdminsForm {
  get formTitle() {
    return $('[data-testid="admins-form-title-container"] > h2');
  }

  get form() {
    return $('[data-testid="admins-form-container"]');
  }

  get firstNameInput() {
    return $('[data-testid="admins-form-container"] [name="firstName"]');
  }

  get lastNameInput() {
    return $('[data-testid="admins-form-container"] [name="lastName"]');
  }

  get dniInput() {
    return $('[data-testid="admins-form-container"] [name="dni"]');
  }

  get phoneInput() {
    return $('[data-testid="admins-form-container"] [name="phone"]');
  }

  get cityInput() {
    return $('[data-testid="admins-form-container"] [name="city"]');
  }

  get emailInput() {
    return $('[data-testid="admins-form-container"] [name="email"]');
  }

  get passwordInput() {
    return $('[data-testid="admins-form-container"] [name="password"]');
  }

  get errorMessages() {
    return $$('[data-testid="admins-form-container"] p');
  }

  get submitBtn() {
    return $('[data-testid="admin-form-buttons"] > div:last-child > div > button');
  }

  get cancelBtn() {
    return $('[data-testid="admin-form-buttons"] a[href="/user/super-admin/admins"]');
  }

  get resetBtn() {
    return $('[data-testid="admins-form-container"] > div:last-child > div > button');
  }

  get confirmModalTitle() {
    return $('[data-testid="confirm-modal-container"] > div > span');
  }

  get confirmModalSubmitBtn() {
    return $('[data-testid="confirm-modal-buttons"] > div:last-child > button');
  }

  async enterFirstName(value) {
    await this.firstNameInput.setValue(value);
  }

  async enterLastName(value) {
    await this.lastNameInput.setValue(value);
  }

  async enterDni(value) {
    await this.dniInput.setValue(value);
  }

  async enterPhone(value) {
    await this.phoneInput.setValue(value);
  }

  async enterCity(value) {
    await this.cityInput.setValue(value);
  }

  async enterEmail(value) {
    await this.emailInput.setValue(value);
  }

  async enterPassword(value) {
    await this.passwordInput.setValue(value);
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

module.exports = new AdminsForm();
