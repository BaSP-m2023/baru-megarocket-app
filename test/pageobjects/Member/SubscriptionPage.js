class Subscription {
  get SubscriptionNavBar() {
    return $("[data-testid='routes-list']> li:nth-child(3) > a");
  }

  get Subscriptionlist() {
    return $("[data-testid='subscriptions-list']");
  }

  get UnSubscriptionListBtn() {
    return $("[data-testid='subscriptions-list'] > tr > td:last-child  button");
  }

  get UnSubscriptionModal() {
    return $("[data-testid='confirm-modal-buttons']");
  }

  get deleteBtnmodal() {
    return $("[data-testid='confirm-modal-buttons']:last-child > div:last-child  button");
  }
}

module.exports = new Subscription();
