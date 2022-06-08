import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed%3Awght%40400%3B700&#038;display=swap&#038;ver=v1.0.0"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            id="mkaz-code-syntax-prism-css-css"
            href="https://wp.katsushi-ougi.com/wp-content/plugins/code-syntax-block/assets/prism-onedark.css"
            type="text/css"
            media="all"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
