import Document, { Html, Head, Main, NextScript } from "next/document";
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from "styled-components";
process.env.DEV_ENV = "development";
console.log(process.env.DEV_ENV);
import index from "../styles/index.scss";
import animation from "../styles/animation.scss";
import buttons from "../styles/buttons.scss";
import text from "../styles/text.scss";
// import '../Utils/prism'
// import '../../styles/prism.css'
if (
  index == undefined ||
  animation == undefined ||
  buttons == undefined ||
  text == undefined
) {
  window.location.reload()
}
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    // 劫持原本的renderPage函数并重写
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // 根App组件
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });
      // 如果重写了getInitialProps 就要把这段逻辑重新实现
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
      <Html>
        <Head>

          <link
            href="https://fonts.googleapis.com/css?family=Poppins:400,800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Audiowide&display=swap"
            rel="stylesheet"
          />

          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
            rel="stylesheet"
          />

          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.10/css/mdb.min.css"
            rel="stylesheet"
          />
        </Head>
        <body style={{ margin: 0, backgroundColor: "#f7f7f7" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
