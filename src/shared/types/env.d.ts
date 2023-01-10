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
      PGADMIN_DEFAULT_EMAIL?: string;
      PGADMIN_DEFAULT_PASSWORD?: string;
      PGADMIN_PORT?: string;
      PGADMIN_LISTEN_PORT?: string;
      JWT_SECRET_KEY?: string;
      JWT_EXPIRATION_TIME?: string;
      JWT_REFRESH_SECRET_KEY?: string;
      JWT_REFRESH_EXPIRATION_TIME?: string;
    }
  }
}

export {};
