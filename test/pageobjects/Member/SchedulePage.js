class Schedule {
  get ScheduleNavBar() {
    return $("[data-testid='routes-list']> li:nth-child(1) > a");
  }

  get homePageSchedule() {
    return $('#root > div > div > div > div:nth-child(2) > div.schedule_container__2yrWU');
  }

  get allActivities() {
    return $('[data-testid="classes-list"] tr:last-child td:last-child');
  }

  get subscribeBtn() {
    return $("[data-testid='activities-subscribe']");
  }
}

module.exports = new Schedule();
