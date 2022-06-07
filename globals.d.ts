declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";

    readonly WORDPRESS_URL: string;
  }
}
