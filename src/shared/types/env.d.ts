declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE?: 'dev' | 'prod' | 'test';
      PORT?: string;
      DATABASE_HOST?: string;
      DATABASE_PORT?: string;
      DATABASE_USERNAME?: string;
      DATABASE_PASSWORD?: string;
      DATABASE_NAME?: string;
      JWT_SECRET_KEY?: string;
      JWT_EXPIRATION_TIME?: string;
    }
  }
}

export {};
