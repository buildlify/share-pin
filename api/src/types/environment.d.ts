// types for .env variables

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number;
      DATABASE_URL: string;
      SENDGRID_API_KEY: string;
      SENDGRID_SENDER: string;
      JWT_PRIVATE_KEY: string;
      JWT_PUBLIC_KEY: string;
      JWT_REGISTER_TOKEN_TTL: string;
      SALT_WORK_FACTOR: number;
      JWT_REFRESH_TOKEN_TTL: string;
      JWT_ACCESS_TOKEN_TTL: string;
    }
  }
}

// convert into a module by adding empty export statement.
export {};
