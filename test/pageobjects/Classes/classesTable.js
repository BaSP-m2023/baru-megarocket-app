class ClassesTable {
  get filterByActivityInput() {
    return $('[data-testid="classes-filters-container"] select');
  }

  get filterByTrainerInput() {
    return $('[data-testid="classes-filters-container"] select:last-child');
  }

  get tableList() {
    return $('[data-testid="classes-list"]');
  }

  get lastEmptyHour() {
    return $('[data-testid="classes-list"] tr:last-child td div:empty');
  }

  get modalForm() {
    return $('[data-testid="confirm-modal-container"] form');
  }

  get modalFormTitle() {
    return $('[data-testid="confirm-modal-container"] form h2');
  }

  get modalFormDelete() {
    return $('[data-testid="confirm-modal-container"] form [data-icon="trash"]');
  }

  get selectActivityInput() {
    return $('[data-testid="confirm-modal-container"] select[name="activity"]');
  }

  get selectTrainerInput() {
    return $('[data-testid="confirm-modal-container"] select[name="trainer"]');
  }

  get capacityInput() {
    return $('[data-testid="confirm-modal-container"] input[name="capacity"]');
  }

  get modalFormSubmitBtn() {
    return $('[data-testid="confirm-modal-buttons"] > div:last-child > button');
  }

  get confirmSubmitBtn() {
    return $('[data-testid="confirm-modal-buttons"]:last-child > div:last-child > button');
  }

  get errorMessages() {
    return $$('[data-testid="confirm-modal-container"] form span');
  }

  async filterActivity(value) {
    await this.filterByActivityInput.selectByVisibleText(value);
  }

  async filterTrainer(index) {
    await this.filterByTrainerInput.selectByIndex(index);
  }

  async clickLastEmptyHour() {
    await this.lastEmptyHour.click();
  }

  async clickModalFormDelete() {
    await this.modalFormDelete.click();
  }

  async enterActivity(value) {
    await this.selectActivityInput.selectByVisibleText(value);
  }

  async enterTrainer(index) {
    await this.selectTrainerInput.selectByIndex(index);
  }

  async enterCapacity(value) {
    await this.capacityInput.setValue(value);
  }

  async submitModalForm() {
    await this.modalFormSubmitBtn.click();
  }

  async clickConfirmBtn() {
    await this.confirmSubmitBtn.click();
  }
}

module.exports = new ClassesTable();
