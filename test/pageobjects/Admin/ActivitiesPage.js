class Activities {
  get ActivitiesNavBar() {
    return $("[data-testid='routes-list']> li:nth-child(1) > a");
  }

  get ActivitiesSearch() {
    return $("[data-testid='activities-search-container']> input");
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

  get ActivitiesAddTrainerSelector() {
    return $('form > div:nth-child(2) input');
  }

  get ActivitiesAddDescription() {
    return $("[data-testid='activities-form-container']> div:nth-child(3) > textarea");
  }

  get ActivitiesAddTrainer() {
    return $('#react-select-7-option-0');
  }

  //Edit
  get ActivitiesEditBtn() {
    return $("[data-testid='activities-list']> tr > td:nth-child(4) > a > svg");
  }

  get ActivitiesEditTitle() {
    return $("[data-testid='activities-form-container']");
  }

  get ActivitiesEditName() {
    return $("[data-testid='activities-form-container']> div:nth-child(1) > input");
  }

  get ActivitiesEditDescription() {
    return $("[data-testid='activities-form-container'] > div:nth-child(3) > textarea");
  }

  //agregar el select del filtro
  get ActivitiesEditTrainerSelector() {
    return $('#react-select-2-placeholder');
  }

  get ActivitiesEditTrainer() {
    return $('#react-select-2-option-2');
  }

  //buttons

  get ActivitiesSubmitBtn() {
    return $("[data-testid='activities-form-container'] > div:last-child > div button");
  }

  get ActivitiesDeleteIcon() {
    return $("[data-testid='activities-list']> tr > td:nth-child(5) > svg");
  }

  //Modal
  get ActivitiesModal() {
    return $("[data-testid='confirm-modal-buttons']:last-child > div:last-child > button");
  }

  get ActivitiesDeleteBtn() {
    return $("[data-testid='confirm-modal-buttons']> div:nth-child(2) > button");
  }
}

module.exports = new Activities();
