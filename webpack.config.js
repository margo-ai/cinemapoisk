const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const port = 2233;
const dist = path.join(__dirname, "dist");
const src = path.join(__dirname, "src");
const host = "localhost";

module.exports = (_, args) => {
  return {
    entry: "./index.tsx",
    devtool: "source-map",
    context: src,
    devServer: { open: true, port, hot: true, historyApiFallback: true, host },
    resolve: {
      modules: [src, "node_modules"],
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      alias: {
        src,
      },
    },
    output: {
      path: dist,
      publicPath: args.mode === "development" ? `http://${host}:${port}/` : undefined,
      filename: `js/[name].js`,
      chunkFilename: `js/[name].js`,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          loader: require.resolve("babel-loader"),
          exclude: /node_modules/,
        },
        {
          test: /\.(jpe?g|png)$/i,
          type: "asset",
        },
        {
          test: /\.svg/,
          type: "asset/inline",
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {},
            },
          },
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        favicon: "./favicon.svg",
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].css",
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.join(__dirname, "tsconfig.json"),
        },
      }),
    ],
  };
};
