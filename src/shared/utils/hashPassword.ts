import bcrypt from 'bcrypt';

export const SALT = 10;

async function hashPassword(value: string): Promise<string> {
  return bcrypt.hash(value, SALT);
}

export default hashPassword;
