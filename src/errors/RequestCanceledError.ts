export class RequestCanceledError extends Error {
  constructor(message = 'Request was canceled by user') {
    super(message);
  }
}
