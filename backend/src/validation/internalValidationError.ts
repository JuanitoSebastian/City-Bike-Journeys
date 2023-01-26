class InternalValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InternalValidationError';
  }
}

export default InternalValidationError;
  