class Activities {
  get ActivitiesNavBar() {
    return $("[data-testid='routes-list']>a:nth-child(2)");
  }

  get ActivitiesSearch() {
    return $("[data-testid='activities-search-container']");
  }

  //add new activity

  get ActivitiesAddNew() {
    return $("[data-testid='add-activity-link']> div > button");
  }

  get ActivitiesAddTitle() {
    return $("[data-testid='activities-form-title-container']");
  }

  get ActivitiesAddName() {
    return $("[data-testid='activities-form-container']> div:nth-child(1) > input");
  }

  get ActivitiesAddDescription() {
    return $("[data-testid='activities-form-container']> div:nth-child(2) > textarea");
  }

  //No se puede encontrar a los elementos en el codigo y esto deja trabado los AT
  // get ActivitiesAddTrainerSelector() {
  //   return $('#react-select-2-placeholder');
  // }

  // get ActivitiesAddTrainer() {
  //   return $('#react-select-2-option-2');
  // }

  //Edit
  get ActivitiesEditBtn() {
    return $("[data-testid='activities-edit-btn']");
  }

  get ActivitiesEditTitle() {
    return $("[data-testid='activities-form-title-container']");
  }

  get ActivitiesEditName() {
    return $("[data-testid='activities-form-container']> div:nth-child(1) > input");
  }

  get ActivitiesEditDescription() {
    return $("[data-testid='activities-form-container']> div:nth-child(2) > textarea");
  }

  //No se puede encontrar a los elementos en el codigo y esto deja trabado los AT
  // get ActivitiesEditTrainerSelector() {
  //   return $('#react-select-2-placeholder');
  // }

  // get ActivitiesEditTrainer() {
  //   return $('#react-select-2-option-2');
  // }

  //buttons

  get ActivitiesSubmitBtn() {
    return $(
      "[data-testid='activities-form-container']> div.form_formButtons__9jfXS > div > button"
    );
  }

  get ActivitiesDeleteIcon() {
    return $("[data-testid='activities-delete-button']");
  }

  //Modal
  get ActivitiesModal() {
    return $("[data-testid='confirm-modal-buttons']");
  }

  get ActivitiesDeleteBtn() {
    return $("[data-testid='confirm-modal-buttons']> div:nth-child(2) > button");
  }
}

module.exports = new Activities();
