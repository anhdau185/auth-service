declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE?: 'dev' | 'prod' | 'test';
      HOST?: string;
      PORT?: string;
      POSTGRES_HOST?: string;
      POSTGRES_PORT?: string;
      POSTGRES_USER?: string;
      POSTGRES_PASSWORD?: string;
      POSTGRES_DB?: string;
      JWT_SECRET_KEY?: string;
      JWT_EXPIRATION_TIME?: string;
      JWT_REFRESH_SECRET_KEY?: string;
      JWT_REFRESH_EXPIRATION_TIME?: string;
    }
  }
}

export {};
