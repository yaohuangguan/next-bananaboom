import Head from "next/head";

const HeadConfig = ({ head }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>
        {head ||
          "Sam 个人博客 博客文章 技术文章 生活文章 个人心得 Blog Posts || yaobaiyang.com"}
      </title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      {/* <link rel="preconnect" href="https://i.ibb.co" crossOrigin="true" />
      <link rel="dns-prefetch" href="https://i.ibb.co" /> */}
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://abs.twimg.com" crossOrigin="true" />
      <link rel="dns-prefetch" href="https://abs.twimg.com" />
      <link
        rel="preconnect"
        href="https://res.cloudinary.com"
        crossOrigin="true"
      />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      <link
        rel="preconnect"
        href="https://cdnjs.cloudflare.com"
        crossOrigin="true"
      />
      <meta name="msapplication-TileColor" content="#2d89ef" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="theme-color" content="normal" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.8.10/css/mdb.min.css"
        rel="stylesheet"
      />
      <script src="/lazyload.min.js" async></script>
    </Head>
  );
};

export default HeadConfig;
