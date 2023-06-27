class Activities {
  get ActivitiesNavBar() {
    return $("[data-testid='routes-list']>a:nth-child(2)");
  }

  //activities home
  get ActivitiesBox() {
    return $("[data-testid='activities-cards-container']> div:nth-child(1)");
  }

  get ActivitiesBasquet() {
    return $("[data-testid='activities-cards-container']> div:nth-child(2)");
  }

  //activities subscription
  get ActivitiesSubs() {
    return $("[data-testid='activities-cards-container']");
  }

  get ActivitiesSubsBasquet() {
    return $("[data-testid='activity-subscription-container']");
  }

  get ActivitiesSelection() {
    return $(
      "[data-testid='activity-subscription-container']> form > select > option:nth-child(1)"
    );
  }

  get ActivitiesSubsSelect() {
    return $(
      "[data-testid='activity-subscription-container']> form > select > option:nth-child(2)"
    );
  }

  //buttons
  get submitBtn() {
    return $("[data-testid='activity-subscription-container']> form > div > div > button");
  }

  get cancelBtn() {
    return $("[data-testid='activity-subscription-container']> form > div > a > div > button");
  }

  get submitBtnBasmodal() {
    return $("[data-testid='confirm-modal-buttons']> div:nth-child(2) > button");
  }
}

module.exports = new Activities();
