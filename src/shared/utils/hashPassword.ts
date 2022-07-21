import * as bcrypt from 'bcrypt';

export const ROUNDS = 10;

async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, ROUNDS);
}

export default hashPassword;
