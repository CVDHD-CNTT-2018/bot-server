const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

module.exports = {
  mode: NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: './index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ]
  },
  target: "node",
  watch: !IS_PRODUCTION
};
