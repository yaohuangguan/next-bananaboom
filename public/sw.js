if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return s[e]||(c=new Promise(async c=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=c}else importScripts(e),c()})),c.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},c=(c,s)=>{Promise.all(c.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(c)};self.define=(c,a,i)=>{s[c]||(s[c]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+c.slice(1)};return Promise.all(a.map(c=>{switch(c){case"exports":return s;case"module":return n;default:return e(c)}})).then(e=>{const c=i(...e);return s.default||(s.default=c),s})}))}}define("./sw.js",["./workbox-eb42688b"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"fpYi22hsbOcRDMnzkIFh7"},{url:"/_next/static/chunks/21.41f45b9df1ebd4f56a19.js",revision:"886fd0de69cc07d15246db14fdd47120"},{url:"/_next/static/chunks/22.43198f782d40c90beb03.js",revision:"f21da144d70bb55403f6ada7ecc91cf0"},{url:"/_next/static/chunks/23.e9723c15851aaac5a968.js",revision:"d230d326e4641407d57bbe9155abf3cf"},{url:"/_next/static/chunks/24.1242fdac7273b6bed07f.js",revision:"bd4402b1740d7a2ee7c89044bdab6438"},{url:"/_next/static/chunks/25.d396aff822d7250c67a1.js",revision:"21b198d6ee42048a510caac5f6b63f25"},{url:"/_next/static/chunks/26.466378759e5b03502eac.js",revision:"e27516e64d82813836b21de53f44a557"},{url:"/_next/static/chunks/27.ecf5eb0d6ba8214d2410.js",revision:"df6715e0519a650ce874f15d7e399674"},{url:"/_next/static/chunks/28.6b700e0f78800b0926e4.js",revision:"258113218329d2d8b97019f074f6ee00"},{url:"/_next/static/chunks/55cb58fcfffd39e8e61e0474b37289c540abd3c2.0a8289f0e1dfc183a041.js",revision:"bb825320ec8550d0cda294033e92db85"},{url:"/_next/static/chunks/601c0cf96aacaf43e5ae1588d6779df1dcb35c14.40e66d8df3ae96613c54.js",revision:"6135d29ae937be2a33d604b5fe010245"},{url:"/_next/static/chunks/60aaf5d72b1e7028fcb963cabe6fccac87d4bc84.5adaaec5431e139bd4ec.js",revision:"cde993d0b2d9fb4bd1d68736b5b15cb2"},{url:"/_next/static/chunks/75e3e1ce7b413499be7ed70fe581da9e57c607d9.2121cd590f32b0f3a40d.js",revision:"bceea276e641c82aff36aaaa760d4010"},{url:"/_next/static/chunks/c8f7fe3b0e41be846d5687592cf2018ff6e22687.9e26b1d1243cca380d57.js",revision:"a80578e6652557046793642ad8231646"},{url:"/_next/static/chunks/commons.4e4c4ebbfcd38382ebd9.js",revision:"0f60b06b85848b489207ec3c07247dd5"},{url:"/_next/static/chunks/ff239f9d.1af5c3282eac553361d7.js",revision:"ed1ce40d6e60f60f3d42ed742fc3cf19"},{url:"/_next/static/chunks/framework.0be02d989528724041bc.js",revision:"e0012cf7a288d2eec0f5ab466c2cee2f"},{url:"/_next/static/chunks/styles.7a16759eb942c50b8f00.js",revision:"de63e1e16b40e987825bc5da7fb35302"},{url:"/_next/static/css/55cb58fcfffd39e8e61e0474b37289c540abd3c2.18b1f6c3.chunk.css",revision:"13a371205d50f09d1f6b5b5baea868ff"},{url:"/_next/static/css/60aaf5d72b1e7028fcb963cabe6fccac87d4bc84.f276faf4.chunk.css",revision:"4c0fc16a7f6356b0e74803a42e8d1347"},{url:"/_next/static/css/styles.59ab45cc.chunk.css",revision:"2f1f182577cd295d15e53a38773714cc"},{url:"/_next/static/fpYi22hsbOcRDMnzkIFh7/pages/_app.js",revision:"88a7b62138b8c71a3a2d3340779a0842"},{url:"/_next/static/fpYi22hsbOcRDMnzkIFh7/pages/_error.js",revision:"b4bd1b91af13f3e424b1c61a51220741"},{url:"/_next/static/fpYi22hsbOcRDMnzkIFh7/pages/blogs.js",revision:"609469382c1c3b6150fc92aeb08ed8f8"},{url:"/_next/static/fpYi22hsbOcRDMnzkIFh7/pages/blogs/article/[id].js",revision:"3d43e5f41a1f6ca6bbdf25930e99fcde"},{url:"/_next/static/fpYi22hsbOcRDMnzkIFh7/pages/dashboard/[id].js",revision:"698f0a315cab941f613052d49783a52a"},{url:"/_next/static/fpYi22hsbOcRDMnzkIFh7/pages/index.js",revision:"960c119115c6140cd7f9087fb1ed03d0"},{url:"/_next/static/fpYi22hsbOcRDMnzkIFh7/pages/resume/[query].js",revision:"312b74037d7821073ac20ca0a72ba641"},{url:"/_next/static/fpYi22hsbOcRDMnzkIFh7/pages/youandme.js",revision:"89a2ccdcbf077223f95ccf4e98ee87c5"},{url:"/_next/static/fpYi22hsbOcRDMnzkIFh7/pages/zh.js",revision:"28faec7f8c3d6ced131be5f6c2117642"},{url:"/_next/static/runtime/main-bb7f1fd48c0feff44886.js",revision:"05ee71dba740d34ac6ffce81d6dbcd89"},{url:"/_next/static/runtime/polyfills-e8d67e0dc900152e0efc.js",revision:"5ad1fff4ee8aa39db6738d442dbfb23d"},{url:"/_next/static/runtime/webpack-3e9dc631655cec35b373.js",revision:"0f4d7a25e2c1678b8a9437ff2c50bcb0"},{url:"/android-chrome-192x192.png",revision:"c87b3ef459c3d9e2ca89a7ce214ea64d"},{url:"/android-chrome-512x512.png",revision:"efa98c7406efc5721bade2c73ffb7ec5"},{url:"/apple-touch-icon.png",revision:"875608d0dc40d89e9b48b94e82489103"},{url:"/browserconfig.xml",revision:"e0b7bb895ea7194b5afa9ed3b07200f3"},{url:"/china.png",revision:"73f4adb96b39d23c292f540cbabad090"},{url:"/favicon-16x16.png",revision:"c86804fcb5629d4b5d5e8099439d9b7f"},{url:"/favicon-32x32.png",revision:"0cbcefe245f1bdfed30f1b48f8351ce6"},{url:"/favicon.ico",revision:"412192267449ea67eebabd3e62acfe51"},{url:"/favicon.png",revision:"0ebc3910af134c8bb39c20e12ec1247e"},{url:"/gamesenshi.png",revision:"7f6ea34200c953aae797475ef65bebf5"},{url:"/heroes.jpg",revision:"824b528276dde6f0cdc4855ae3688c1a"},{url:"/lazyload.min.js",revision:"6c3641ab34d963ab6ac70ac719a1094b"},{url:"/manifest.json",revision:"688128be216cc2f753fe641590f2fcd3"},{url:"/mstile-150x150.png",revision:"15482ee3f89b16155def523407fa5dea"},{url:"/music/heroes.mp3",revision:"b394a00e495669733318e4c0a0be19e2"},{url:"/music/sayyouwontletgo.mp3",revision:"8aa803bd9cfb58e4657f046e55d43d99"},{url:"/music/simmer.mp3",revision:"3c419d2e9b734627f2b4df97ff822032"},{url:"/music/titanic.mp3",revision:"47e2044a14298b269c3983a77aaab4e0"},{url:"/pay.jpeg",revision:"1362f34bc869bf8dade7c41e4ebbf391"},{url:"/robots.txt",revision:"cb333937db4fdf75f29294867cd772cf"},{url:"/safari-pinned-tab.svg",revision:"8d3b492754aa60e19fc9af67d250b55c"},{url:"/sayyouwontletgo.jpg",revision:"5424f0187eb82f7357f112a39187c15d"},{url:"/simmer.jpg",revision:"0100ab3172afd84414cebcdb8b7889d1"},{url:"/titanic.jpg",revision:"a210f63a4334d56efe06633da7491c60"},{url:"/uk.png",revision:"28440432fc2d1bf6376debc86ef218ad"},{url:"/video/c.mpeg",revision:"38adf7c5609794984027085fdd6ed0d5"},{url:"/video/c.webm",revision:"6bfe1e3cf2b7141426cb78e0db733f08"},{url:"/video/en.mpeg",revision:"ba0a4f79c24c0dbb9dcab62d4eddedbe"},{url:"/video/en.webm",revision:"f0eb025a91a8f0faab01b350640ec637"},{url:"/worker/Worker.js",revision:"8a159b329244869b1d84b10bec3bcceb"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
