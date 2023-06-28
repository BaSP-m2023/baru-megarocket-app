class MembersCreateModal {
  get membersCreateModalTitle() {
    return $('[data-testid="members-form-title-container"] > h2');
  }

  get membersCreateModalCrossBtn() {
    return $('[data-testid="members-form-title-container"] > span');
  }

  get membersCreateModalNameInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(1) > input');
  }

  get membersCreateModalLastNameInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(2) > input');
  }

  get membersCreateModalDniInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(3) > input');
  }

  get membersCreateModalPhoneInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(4) > input');
  }

  get membersCreateModalEmailInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(5) > input');
  }

  get membersCreateModalCityInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(6) > input');
  }

  get membersCreateModalDateInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(7) > input');
  }

  get membersCreateModalZipInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(8) > input');
  }

  get membersCreateModalMemberInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(9) > select');
  }

  get membersCreateModalPasswordInput() {
    return $('[data-testid="members-form-container"] > div:nth-child(10) > input');
  }

  get membersCreateModalCheckBtn() {
    return $('[data-testid="members-form-container"] > div:nth-child(11) > input');
  }

  get membersCreateModalResetBtn() {
    return $('#root > div > div > div > form > div.form_reset_button__odnCK > div > button');
  }

  get membersCreateModalSubmitBtn() {
    return $('#root > div > div > div > div.form_container_button__2UZ+U > div > button');
  }

  async fillMembersCreateModalForm(
    firtName,
    lastName,
    dni,
    phone,
    email,
    city,
    date,
    zip,
    membership,
    password,
    check
  ) {
    await this.membersCreateModalNameInput.setValue(firtName);
    await this.membersCreateModalLastNameInput.setValue(lastName);
    await this.membersCreateModalDniInput.setValue(dni);
    await this.membersCreateModalPhoneInput.setValue(phone);
    await this.membersCreateModalEmailInput.setValue(email);
    await this.membersCreateModalCityInput.setValue(city);
    await this.membersCreateModalDateInput.setValue(date);
    await this.membersCreateModalZipInput.setValue(zip);
    await this.membersCreateModalMemberInput.setValue(membership);
    await this.membersCreateModalPasswordInput.setValue(password);
    await this.membersCreateModalCheckBtn.setValue(check);
  }

  async membersCreateModalCrossBtnClick() {
    await this.membersCreateModalCrossBtn.click();
  }

  async membersCreateModalResetBtnClick() {
    await this.membersCreateModalResetBtn.click();
  }

  async membersCreateModalSubmitBtnCLick() {
    await this.membersCreateModalSubmitBtn.click();
  }
}

export default MembersCreateModal;
