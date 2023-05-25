const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

const isServe = process.env.NODE_ENV === "serve";
const isDev = process.env.NODE_ENV === "development" || isServe;
const isProd = process.env.NODE_ENV === "production";
const fontsFileName = "fonts/[name][ext]";
const imagesFileName = isDev ? "img/[name][ext]" : "img/[name]-[contenthash][ext]";
const cssFileName = isDev ? "css/[name].css" : "css/[name]-[contenthash].css";
const jsFileName = isDev ? "js/[name].js" : "js/[name]-[contenthash].js";
const dotenvPath = isDev ? "./.env.development" : "./.env.production";

const optimization = () => {
   const config = {
      splitChunks: {
         chunks: "all",
      },
   };

   if (isProd) {
      config.minimizer = [new TerserPlugin(), new CssMinimizerPlugin()];
   }

   return config;
};

const plugins = [
   new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/templates/index.html",
   }),
   new MiniCssExtractPlugin({ filename: cssFileName }),
   new Dotenv({
      path: dotenvPath,
   }),
   new CopyWebpackPlugin({
      patterns: [
         { from: "src/templates/manifest.json", to: "[name][ext]" },
         { from: "src/assets/icons/*.png", to: "icons/[name][ext]" },
      ],
   }),
   new GenerateSW({
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
      swDest: "/serviceWorker.js",
      clientsClaim: true,
      skipWaiting: true,
   }),
   // new InjectManifest({
   //    swSrc: "./src/sw/serviceWorker.js",
   //    include: Object.values(filesRegex),
   //    maximumFileSizeToCacheInBytes: 1024 * 1024 * 5,
   // }),
];

if (isServe) {
   plugins.push(new ReactRefreshPlugin());
}

const cssLoaders = (isSass) => {
   const miniCssExtractPluginLoader = {
      loader: MiniCssExtractPlugin.loader,
   };

   const cssLoader = {
      loader: "css-loader",
   };

   const postCssLoader = {
      loader: "postcss-loader",
      options: {
         postcssOptions: {
            plugins: [postcssPresetEnv],
         },
      },
   };

   const sassLoader = {
      loader: "sass-loader",
   };

   const loaders = [miniCssExtractPluginLoader, cssLoader, postCssLoader];
   if (isSass) loaders.push(sassLoader);

   return loaders;
};

module.exports = {
   target: "web",
   mode: (isProd && "production") || (isDev && "development") || "development",
   resolve: {
      extensions: [".js", ".ts", ".jsx", ".tsx"],
      alias: {
         "@": path.resolve(__dirname, "src"),
         "@@": path.resolve(__dirname, "./"),
      },
   },
   entry: {
      index: "./src/index.tsx",
   },
   output: {
      filename: jsFileName,
      chunkFilename: "[name].chunk.js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: !isProd ? "[name][ext]" : "[name]-[contenthash][ext]",
      clean: true,
      publicPath: "/",
   },
   devServer: {
      client: {
         overlay: {
            warnings: false,
            errors: true,
         },
      },
      port: 8000,
      historyApiFallback: true,
   },
   plugins,
   optimization: optimization(),
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: cssLoaders(),
            generator: {
               filename: cssFileName,
            },
         },
         {
            test: /\.scss$/i,
            use: cssLoaders(true),
            generator: {
               filename: cssFileName,
            },
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
            generator: {
               filename: imagesFileName,
            },
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
            generator: {
               filename: fontsFileName,
            },
         },
         {
            test: /\.[jt]s?/,
            loader: "ts-loader",
            options: {
               transpileOnly: false,
               // transpileOnly: true,
            },
            exclude: [/node_modules/, /\.(json)/],
         },
      ],
   },
   devtool: "source-map",
};
