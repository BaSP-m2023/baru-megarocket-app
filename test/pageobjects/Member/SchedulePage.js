class Schedule {
  get ScheduleNavBar() {
    return $("[data-testid='routes-list']> li:nth-child(1) > a");
  }

  get homePageSchedule() {
    return $('#root > div > div > div > div:nth-child(2) > div.schedule_container__2yrWU');
  }

  get filterByActivityInput() {
    return $('[data-testid="classes-filters-container"] select');
  }

  get filterByActivityAll() {
    return $(
      '[data-testid="classes-filters-container"]> select:nth-child(2) > option:nth-child(1)'
    );
  }

  get filterByActivityBoxing() {
    return $(
      '[data-testid="classes-filters-container"]> select:nth-child(2) > option:nth-child(2)'
    );
  }

  get filterByTrainerInput() {
    return $('[data-testid="classes-filters-container"] select:last-child');
  }

  get filterByTrainerAll() {
    return $(
      '[data-testid="classes-filters-container"]> select:nth-child(4) > option:nth-child(1)'
    );
  }

  get filterByTrainerNico() {
    return $(
      '[data-testid="classes-filters-container"]> select:nth-child(4) > option:nth-child(3)'
    );
  }
}

module.exports = new Schedule();
