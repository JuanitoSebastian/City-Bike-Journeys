class SeedingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SeedingError';
  }
}

export default SeedingError;
  