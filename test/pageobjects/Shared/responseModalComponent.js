class ResponseModal {
  get modalText() {
    return $('[data-testid="response-toast-container"] > p');
  }
}

module.exports = new ResponseModal();
