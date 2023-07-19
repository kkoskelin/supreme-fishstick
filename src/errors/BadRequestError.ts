export class BadRequestError extends Error {
  constructor(message = 'Invalid request') {
    super(message);
  }
}
