export class InvalidPasswordError extends Error {
  constructor(message = 'Invalid password') {
    super(message);
  }
}
