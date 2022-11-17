const webpack = require("webpack");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(["dist"], { root: path.join(__dirname, "..") }),
    new CopyWebpackPlugin([
      { from: "src/manifest.json" },
      
      { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: './dist/css/' },
      { from: 'node_modules/bootstrap/dist/js/bootstrap.min.js', to: './dist/js/' },

      { from: 'node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.css', to: './dist/css/' },
      { from: 'node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.js', to: './dist/js/' },

      { from: 'node_modules/jquery/dist/jquery.min.js', to: './dist/js/' },

    ]),
  ]
});
