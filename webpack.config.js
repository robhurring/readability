const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let nodemon = new NodemonPlugin({
  verbose: true,
  script: "./server.js"
});

module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/assets"),
    publicPath: "assets/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{loader: "style-loader/url"}, "file-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [nodemon]
};
