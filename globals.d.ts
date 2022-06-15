declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";

    readonly WORDPRESS_URL: string;
    readonly NEXT_PUBLIC_ALGOLIA_APP_ID: string;
    readonly NEXT_PUBLIC_ALGOLIA_API_KEY: string;
    readonly NEXT_PUBLIC_ALGOLIA_INDEX_NAME: string;
  }
}
