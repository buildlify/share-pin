// types for .env variables

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: number;
      DATABASE_URL: string;
    }
  }
}

// convert into a module by adding empty export statement.
export {};
