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
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="apple-mobile-web-app-title" content="Sam web blog" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />

          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-navbutton-color" content="blue" />
          <meta name="msapplication-TileColor" content="black" />
          <meta name="msapplication-TileImage" content="mstile-150x150.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />

          <meta name="theme-color" content="#ffffff" />
          <meta name="theme-color" content="normal" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="application-name" content="Sam web blog" />
          <meta name="msapplication-tooltip" content="thanks for visiting" />
          <meta name="msapplication-starturl" content="/" />

          <meta name="msapplication-tap-highlight" content="no" />

          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          <meta name="nightmode" content="enable/disable" />

          <meta name="layoutmode" content="fitscreen/standard" />

          <meta name="imagemode" content="force" />

          <meta name="screen-orientation" content="portrait" />
          <meta
            name="description"
            content="姚柏杨的网站，yaobaiyang's website, yaobaiyang.com"
          />
          <meta
            property="og:description"
            content="姚柏杨的网站，yaobaiyang's website, yaobaiyang.com"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://www.yaobaiyang.com" />
          <meta name="twitter:title" content="sam yao website" />
          <meta name="twitter:description" content="sam yao website" />
          <meta
            name="twitter:image"
            content="https://www.yaobaiyang.com/icon-192x192.png"
          />
          <meta name="twitter:creator" content="Samyao" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Sam yao website" />
          <meta property="og:description" content="Sam yao website" />
          <meta property="og:site_name" content="Bananboom" />
          <meta property="og:url" content="https://www.yaobaiyang.com" />
          <meta
            property="og:image"
            content="https://www.yaobaiyang.com/apple-touch-icon.png"
          />
        </Head>
        <body
          style={{
            margin: 0
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
