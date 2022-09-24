import { CryptoService } from "./crypto.service";

describe('Test CryptoService', () => {
  it('should return true when password is valid', async () => {
    const service = new CryptoService();

    const passwordStub = 'valid-password';

    const hashedPassword = await service.createPassword(passwordStub);
    const validationResult = await service.verifyPassword(passwordStub, hashedPassword);

    expect(validationResult).toBe(true);
  });

  it('should return true when password is valid', async () => {
    const service = new CryptoService();

    const passwordStub = 'valid-password';
    const invalidPasswordStub = 'invalid-password'

    const hashedPassword = await service.createPassword(passwordStub);
    const validationResult = await service.verifyPassword(invalidPasswordStub, hashedPassword);

    expect(validationResult).toBe(false);
  });
})
