import type { AppProps } from "next/app";
import Head from "next/head";

import GoogleTagManager from "../components/GoogleTagManager";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import "../styles/satellite.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <GoogleTagManager />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
