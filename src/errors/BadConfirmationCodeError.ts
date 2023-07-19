export class BadConfirmationCodeError extends Error {
  constructor(message = 'Confirmation code is not valid') {
    super(message);
  }
}
