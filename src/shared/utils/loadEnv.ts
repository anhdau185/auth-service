import * as dotenv from 'dotenv';

function loadEnv() {
  if (process.env.MODE === undefined) {
    dotenv.config();
  }
}

export default loadEnv;
