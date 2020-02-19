const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");

const nextConfig = withOffline(
  withCSS(
    withSass({
      webpack(config, options) {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        });
        return config;
      }
    })
  )
);
// const offline = {
//   target: "serverless",
//   workboxOpts: {
//     swDest: "static/service-worker.js",
//     runtimeCaching: [
//       {
//         urlPattern: /^https?.*/,
//         handler: "NetworkFirst",
//         options: {
//           cacheName: "https-calls",
//           networkTimeoutSeconds: 15,
//           expiration: {
//             maxEntries: 150,
//             maxAgeSeconds: 30 * 24 * 60 * 60
//           },
//           cacheableResponse: {
//             statuses: [0, 200]
//           }
//         }
//       }
//     ]
//   }
// };

module.exports = {...nextConfig};
