// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_BASE_URL: string;
    // Add other environment variables as needed
  }
}

declare var process: {
  env: NodeJS.ProcessEnv;
};
