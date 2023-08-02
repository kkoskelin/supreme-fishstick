export class EmptyCredentialsError extends Error {
  constructor(message = 'Empty Credentials') {
    super(message);
  }
}
