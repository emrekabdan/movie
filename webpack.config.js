const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const env = require("dotenv").config().parsed;
module.exports = ({ WEBPACK_BUILD }) => {
  return {
    entry: path.resolve(__dirname, "src/index.js"),
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devtool: false,

    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    devServer: {
      historyApiFallback: true,
      host: env.HOST,
      port: env.PORT,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/img/[hash][ext][query]",
          },
        },
        {
          test: /\.(ttf)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/font/[hash][ext][query]",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(scss)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },

        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: {
                        browsers: ["> 1%", "last 2 versions", "chrome 41"],
                      },
                    },
                  ],
                  "@babel/preset-react",
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      WEBPACK_BUILD === true
        ? new Dotenv({
            path: "./.env.prod",
          })
        : new Dotenv(),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "public/index.html"),
        filename: "index.html",
      }),
      new ESLintPlugin(),
      new CopyPlugin({
        patterns: [{ from: "public/assets", to: "assets" }],
      }),
    ],
  };
};
