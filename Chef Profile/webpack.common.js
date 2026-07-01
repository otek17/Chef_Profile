const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'js/[name].[contenthash].js',
    publicPath: '/Chef_Profile/',
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|webp|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash][ext]',
        },
      },
    ],
  },
};
