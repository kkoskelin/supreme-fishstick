export class FillRequiredFieldsError extends Error {
  constructor(message = 'Fill required fields') {
    super(message);
  }
}
