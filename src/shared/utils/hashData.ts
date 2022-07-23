import * as bcrypt from 'bcrypt';

export const ROUNDS = 10;

async function hashData(plainData: string): Promise<string> {
  return bcrypt.hash(plainData, ROUNDS);
}

export default hashData;
