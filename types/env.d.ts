declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NUXT_PUBLIC_API_BASE?: string;
    }
  }
}

export {};
