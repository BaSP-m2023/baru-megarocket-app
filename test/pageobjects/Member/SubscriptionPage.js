class Subscription {
  get SubscriptionNavBar() {
    return $("[data-testid='routes-list']>a:nth-child(3)");
  }

  get Subscriptionlist() {
    return $("[data-testid='subscriptions-list']");
  }

  get UnSubscriptionListBtn() {
    return $(
      "[data-testid='subscriptions-list']> tr > td.subscriptionMember_button__OKcwb > div > div > button"
    );
  }

  get SubscriptionModal() {
    return $("[data-testid='confirm-modal-buttons']");
  }

  get deleteBtnmodal() {
    return $("[data-testid='confirm-modal-buttons']> div:nth-child(2) > button");
  }
}

module.exports = new Subscription();
