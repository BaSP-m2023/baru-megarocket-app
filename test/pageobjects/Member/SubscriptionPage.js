class Subscription {
  get SubscriptionNavBar() {
    return $("[data-testid='routes-list']> li:nth-child(3) > a");
  }

  get Subscriptionlist() {
    return $("[data-testid='subscriptions-list']");
  }

  get UnSubscriptionListBtn() {
    return $(
      "[data-testid='subscriptions-list']> tr:nth-child(1) > td.subscriptionMember_button__wiKkh > div > div > button"
    );
  }

  get UnSubscriptionModal() {
    return $("[data-testid='confirm-modal-buttons']");
  }

  get deleteBtnmodal() {
    return $("[data-testid='confirm-modal-buttons']> div:nth-child(2) > button");
  }
}

module.exports = new Subscription();
