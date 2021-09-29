/* craco.config.js */
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const BrotliPlugin = require("brotli-webpack-plugin");

module.exports = {
  webpack: {
    plugins:
      process.env.NODE_ENV !== "production"
        ? [
            new BundleAnalyzerPlugin(),
            new BrotliPlugin({
              asset: "[path].br[query]",
              test: /\.(js|css|html|svg)$/,
              threshold: 10240,
              minRatio: 0.8,
            }),
          ]
        : [
            new BrotliPlugin({
              asset: "[path].br[query]",
              test: /\.(js|css|html|svg)$/,
              threshold: 10240,
              minRatio: 0.8,
            }),
          ],
    configure: {
      optimization: {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace("@", "")}`;
              },
            },
          },
        },
      },
    },
  },
};
