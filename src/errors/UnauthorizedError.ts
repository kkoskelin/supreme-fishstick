export class UnauthorizedError extends Error {
  constructor(message = 'Invalid credentials') {
    super(message);
  }
}
