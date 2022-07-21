import * as dotenv from 'dotenv';

function setUpEnv() {
  if (process.env.MODE === undefined) {
    dotenv.config();
  }
}

export default setUpEnv;
