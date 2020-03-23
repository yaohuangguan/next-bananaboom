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
