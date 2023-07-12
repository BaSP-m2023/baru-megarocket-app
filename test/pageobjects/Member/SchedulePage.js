class Schedule {
  get ScheduleNavBar() {
    return $("[data-testid='routes-list']> li:nth-child(2) > a");
  }
}

module.exports = new Schedule();
