const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[hash:8].js',
    path: '/',
    publicPath: '/resume'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE.ENV': 'development'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash:8].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor" // 指定公共 bundle 的名字。
    }),
    new FaviconsWebpackPlugin('./src/project_dao/resume/resume/imgs/favicon.png'),
    new HtmlwebpackPlugin({
      title: "Qiujie's Resume",
      inject: true, // true | 'head' | 'body' | false ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中
      cache: true, // true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件
      showErrors: true, // true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
      // chunks: ['vendor', 'src'],
      template: path.resolve(__dirname, 'src/project_dao/resume/resume/index.html'),
      filename: './index.html'
    })
  ],
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      exclude: /node_moudle/,
      include: path.join(__dirname, './src'),
      use: {
        loader: "babel-loader"
      }
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
              // If you are having trouble with urls not resolving add this setting.
              // See https://github.com/webpack-contrib/css-loader#url
              url: false,
              // minimize: true,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader"
        }, {
          loader: "postcss-loader",
          options: { // 如果没有options这个选项将会报错 No PostCSS Config found
            plugins: (loader) => [
              require('autoprefixer')(), //CSS浏览器兼容
            ]
          }
        }],
      })
    }, {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: '/imgs/[name].[hash:8].[ext]'
        }
      } //参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式
    }, {
      //文件加载器，处理文件静态资源
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: {
        loader: 'file-loader',
        query: {
          name: '/fonts/[name].[hash:8].[ext]'
        }
      }
    }, {
      //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
      //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
      test: /\.html$/,
      use: "html-loader?attrs=img:src img:data-src"
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    // host: 'localhost',
    host: '192.168.99.178',
    port: 8081,
    watchContentBase: true,
    hot: true, // 热启动
    historyApiFallback: true, // 不跳转
    inline: true // 可以监控js变化
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss', '.png', '.jpg'],
    alias: {
      'jquery': path.resolve(__dirname, './node_modules/jquery/src/jquery.js'),
      '@': path.join(__dirname, './src/project_dao')
    }
  }
};