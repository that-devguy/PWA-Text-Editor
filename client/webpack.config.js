const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // HtmlWebpackPlugin for generating the HTML file
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        title: "Just Another Text Editor",
      }),

      // WebpackPwaManifest for generating the manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E.",
        description: "Take notes or write code snippets anywhere, anytime!",
        background_color: "#ffffff",
        theme_color: "#3367d6",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),

      // InjectManifest to generate service worker using Workbox
      new InjectManifest({
        swSrc: "./src/sw.js",
        swDest: 'src-sw.js',
      }),
    ],

    module: {
      rules: [
        // CSS loaders to handle CSS files
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },

        // Add Babel loader to transpile JavaScript files
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
