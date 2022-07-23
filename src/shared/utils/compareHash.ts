import * as bcrypt from 'bcrypt';

async function compareHash(
  plainData: string,
  hashedData: string,
): Promise<boolean> {
  return bcrypt.compare(plainData, hashedData);
}

export default compareHash;
