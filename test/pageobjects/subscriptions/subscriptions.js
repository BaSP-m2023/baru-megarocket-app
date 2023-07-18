class Subscription {
  get subscriptionTitle() {
    return $('#root > div > section > h1');
  }

  get subscriptionTitleSearchInput() {
    return $('[data-testid="subscriptions-search-container"] > input');
  }

  get subscriptionTableTr1Td1() {
    return $('[data-testid="subscriptions-list"] > tr:nth-child(1) > td:nth-child(1)');
  }

  get subscriptionTableTr1Td2() {
    return $('[data-testid="subscriptions-list"] > tr:nth-child(1) > td:nth-child(2)');
  }

  get subscriptionTableTr1EditBtn() {
    return $('[data-testid="subscriptions-list"] > tr:nth-child(1) > td:nth-child(4) > a');
  }

  get subscriptionTableTr1DeleteBtn() {
    return $('[data-testid="subscriptions-list"] > tr:nth-child(1) > td:nth-child(5) > a');
  }

  get subscriptionAddNewBtn() {
    return $('[data-testid="subscription-add-link"] > div > button');
  }

  async subscriptionTableTr1EditBtnClick() {
    await this.subscriptionTableTr1EditBtn.click();
  }
  async subscriptionTableTr1DeleteBtnClick() {
    await this.subscriptionTableTr1DeleteBtn.click();
  }

  async subscriptionAddNewBtnClick() {
    await this.subscriptionAddNewBtn.click();
  }
}
export default Subscription;
