class Activities {
  get ActivitiesNavBar() {
    return $("[data-testid='routes-list']>a:nth-child(2)");
  }

  get ActivitiesBox() {
    return $("[data-testid='activities-cards-container']> div:nth-child(1)");
  }

  get ActivitiesBas() {
    return $("[data-testid='activities-cards-container']> div:nth-child(2)");
  }
}

module.exports = new Activities();
