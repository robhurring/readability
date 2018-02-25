const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

let nodemon = new NodemonPlugin({
  verbose: true,
  script: "./server.js"
});

module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/assets")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [nodemon]
};
