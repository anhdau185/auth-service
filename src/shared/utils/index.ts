import * as dotenv from 'dotenv';

export function setUpEnv() {
  if (process.env.MODE === undefined) {
    dotenv.config();
  }
}
