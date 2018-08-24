const path = require("path");
const webpack = require("webpack");
const CopyWebPackPlugin= require("copy-webpack-plugin");

module.exports = {
  entry: "./start-app.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-1'],
          plugins: (() => {
            return [
                'transform-decorators-legacy'
            ]
          })()
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
    devtool: "source-map",
    devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 5000,
    publicPath: "http://localhost:5000/dist/",
    hotOnly: true
  },
  plugins: [ new webpack.HotModuleReplacementPlugin() ,
             new webpack.ProvidePlugin({
                'window.jQuery' : 'jquery',
                jQuery: 'jquery',
                $: 'jquery'
             }),
             new CopyWebPackPlugin ([
                {
                  from : path.resolve(__dirname, "data/"), to: path.join(__dirname, "dist/")
                }
             ])
    ]
};