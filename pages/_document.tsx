import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
          enhanceComponent: Component => Component
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="red" />
          <meta name="mobile-web-app-capable" content="yes" />

          <meta name="apple-mobile-web-app-title" content="Sam web blog" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />

          <meta name="msapplication-navbutton-color" content="red" />
          <meta name="msapplication-TileColor" content="red" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />

          <meta name="application-name" content="Sam web blog" />
          <meta name="msapplication-tooltip" content="thanks for visiting" />
          <meta name="msapplication-starturl" content="/" />

          <meta name="msapplication-tap-highlight" content="no" />

          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          <meta name="nightmode" content="enable/disable" />

          <meta name="viewport" content="uc-fitscreen=yes" />

          <meta name="layoutmode" content="fitscreen/standard" />

          <meta name="imagemode" content="force" />

          <meta name="screen-orientation" content="portrait" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="姚柏杨的网站，yaobaiyang's website, yaobaiyang.com"
          />
          <meta
            property="og:description"
            content="姚柏杨的网站，yaobaiyang's website, yaobaiyang.com"
          />
        </Head>
        <body style={{ margin: 0, backgroundColor: "white" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
