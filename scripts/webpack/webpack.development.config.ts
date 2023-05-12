import { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const configuration: Configuration = {
  target: 'web',
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../../src')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },

      {
        test: /\.(jpg|jpeg|png)$/,
        type: 'asset/resource'
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, '../../src/tsconfig.json')
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../static/index.html')
    })
  ],
  output: {
    path: path.resolve(__dirname, '../../public')
  }
};

export default configuration;
