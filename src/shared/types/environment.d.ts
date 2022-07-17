declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOST: number;
      POSTGRES_HOST: string;
      POSTGRES_PORT: number;
      POSTGRES_USERNAME: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
    }
  }
}

export {};
