const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isServe = process.env.NODE_ENV === "serve";
const isDev = process.env.NODE_ENV === "development" || isServe;
const isProd = process.env.NODE_ENV === "production";

const imagesFileName = "img/[name][ext]";
const fontsFileName = "fonts/[name][ext]";
const cssFileName = "css/[name].css";

const plugins = [
   new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/templates/index.html",
   }),
   new MiniCssExtractPlugin({ filename: cssFileName }),
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
      filename: "js/[name].js",
      path: path.resolve(__dirname, "dist"),
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
               transpileOnly: true,
               // transpileOnly: true,
            },
            exclude: [/node_modules/, /\.(json)/],
         },
      ],
   },
   optimization: {
      runtimeChunk: "single",
   },
   devtool: "source-map",
};
