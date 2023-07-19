class Activities {
  get ActivitiesNavBar() {
    return $("[data-testid='routes-list']> li:nth-child(2) > a");
  }

  get ActivitiesHomePage() {
    return $("[data-testid='activities-cards-container']");
  }
}

module.exports = new Activities();
