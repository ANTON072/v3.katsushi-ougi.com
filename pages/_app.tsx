import type { AppProps } from "next/app";
import Head from "next/head";
import TagManager from "react-gtm-module";
import { useMount } from "react-use";

import Layout from "../components/Layout";
import "../styles/globals.scss";
import "../styles/satellite.scss";

function MyApp({ Component, pageProps }: AppProps) {
  useMount(() => {
    TagManager.initialize({ gtmId: "GTM-MC9FNBQ" });
  });

  return (
    <Layout>
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
