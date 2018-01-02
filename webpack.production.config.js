const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, './dist/webpack'),
    publicPath: '/project_dao/webpack'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE.ENV': 'production'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true
    // }),
    new FaviconsWebpackPlugin('./src/project_dao/resume/resume/imgs/favicon.png'),
    new ExtractTextPlugin({
      filename: 'css/[name].[hash:8].css',
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor" // 指定公共 bundle 的名字。
    }),
    new webpack.optimize.UglifyJsPlugin({ //压缩代码
      compress: {
        warnings: false
      },
      sourceMap: true,
      except: ['$super', '$', 'exports', 'require'] //排除关键字
    }),
    new HtmlwebpackPlugin({
      title: "Qiujie's Resume",
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      },
      inject: true, // true | 'head' | 'body' | false ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中
      showErrors: true, // true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
      // chunks: ['vendor', 'src'],
      template: path.resolve(__dirname, './src/project_dao/resume/resume/index.html'),
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
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss', '.png', '.jpg'],
    alias: {
      'jquery': path.resolve(__dirname, './node_modules/jquery/src/jquery.js'),
      '@': path.join(__dirname, './src/project_dao')
    }
  }
};