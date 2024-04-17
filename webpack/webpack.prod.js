const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    // Define new env variables
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("production"),
    }),
  ],
};
