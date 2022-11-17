const webpack = require("webpack");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "src/manifest.json",
        transform: (content, path) => content.toString().replace("\"persistent\": false", "\"persistent\": true")
        
      },
      { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: './dist/css/' },
      { from: 'node_modules/bootstrap/dist/js/bootstrap.min.js', to: './dist/js/' },

      { from: 'node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.css', to: './dist/css/' },
      { from: 'node_modules/bootstrap-tagsinput/dist/bootstrap-tagsinput.js', to: './dist/js/' },

      { from: 'node_modules/jquery/dist/jquery.min.js', to: './dist/js/' },


    ])
  ]
});
