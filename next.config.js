const withSASS = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withPwa = require("next-pwa");
const nextConfig = withCSS(
  withSASS({
    webpack(config, options) {
      config.module.rules.push(
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        },
        {
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      );
      return config;
    },
    pwa: {
      dest: "public"
    },
    devIndicators: {
      autoPrerender: false
    }
  })
);

module.exports =
  process.env.NODE_ENV === "production" ? withPwa(nextConfig) : nextConfig;

