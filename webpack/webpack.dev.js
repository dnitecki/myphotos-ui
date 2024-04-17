const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
    port: 8000,
  },
  plugins: [
    // Define new env variables
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("development"),
    }),
  ],
};
