import Head from "next/head";

const HeadConfig = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>Moviegoer</title>
      <link rel="icon" href="/favicon.ico" />

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
      <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="true" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      <link
        rel="preconnect"
        href="https://cdnjs.cloudflare.com"
        crossOrigin="true"
      />
      <meta name="msapplication-TileColor" content="#2d89ef" />
      <meta name="theme-color" content="#ffffff"></meta>
      <meta name="theme-color" content="normal" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="description"
        content="Sam的云空间,这里记录了sam的个人成长生活。目前在BeeHex担任前端架构，正寻找新的机会，望广大HR或招募者联系yaob@miamioh.edu！ Git, HTML, CSS, Sass, Linux, JavaScript, Python, Vue.js, React, React-native, Redux, Bootstrap,
    Node.js, Express.js, GraphQL, Docker, Postman, PostgreSQL, MongoDB, Redis, Knowing how
    HTTP, TCP/IP, DNS and Web Server work...."
      />
      <meta
        property="og:description"
        content="Sam的云空间,这里记录了sam的个人成长生活。目前在BeeHex担任前端架构，正寻找新的机会，望广大HR或招募者联系yaob@miamioh.edu！ Git, HTML, CSS, Sass, Linux, JavaScript, Python, Vue.js, React, React-native, Redux, Bootstrap,
Node.js, Express.js, GraphQL, Docker, Postman, PostgreSQL, MongoDB, Redis, Knowing how
HTTP, TCP/IP, DNS and Web Server work...."
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
