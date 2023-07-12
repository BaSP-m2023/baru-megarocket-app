class Activities {
  get ActivitiesNavBar() {
    return $("[data-testid='routes-list']>a:nth-child(3)");
  }

  //activities home
  get ActivitiesBox() {
    return $("[data-testid='activities-cards-container']> div:nth-child(1)");
  }

  get ActivitiesBasket() {
    return $("[data-testid='activities-cards-container']> div:nth-child(2)");
  }

  get ActivitiesFootball() {
    return $("[data-testid='activities-cards-container']> div:nth-child(3)");
  }

  get ActivitiesCrossfit() {
    return $("[data-testid='activities-cards-container']> div:nth-child(4)");
  }

  get ActivitiesMusculation() {
    return $("[data-testid='activities-cards-container']> div:nth-child(5)");
  }

  get ActivitiesSpinning() {
    return $("[data-testid='activities-cards-container']> div:nth-child(6)");
  }

  //activities subscription ???
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
