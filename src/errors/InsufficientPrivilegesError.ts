export class InsufficientPrivilegesError extends Error {
  constructor(message = 'Insufficient Privileges') {
    super(message);
  }
}
