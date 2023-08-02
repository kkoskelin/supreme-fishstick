export class PasswordsDontMatchError extends Error {
  constructor(message = 'Passwords do not match') {
    super(message);
  }
}
