var path = require('path')
var webpack = require('webpack')

module.exports = {
  // entry: './src/main.js', // 项目入口
  entry: './src/lib/index.js', // 注释掉原有的
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    // filename: 'build.js' // 打包后输出的文件名
    filename: 'starpost-ui.js', // 我们可不想打包后叫build.js 多low啊 起一个与项目相对应的
    library: 'Starpost', // library指定的就是你使用require时的模块名，这里便是require("Starpost")
    libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。},
  },
  //babel配置，ES6
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
          // the "scss" and "sass" values for the lang attribute to the right configs here.
          // other preprocessors should work out of the box, no loader config like this necessary.
          'scss': 'vue-style-loader!css-loader!sass-loader',
          'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        }
        // other vue-loader options go here
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  //node服务器，实时预览
  devServer: {
    //contentBase: __dirname + "/build",//本地服务器所加载的页面所在的目录
    // historyApiFallback: true,//不跳转
    inline: true, //当源文件改变时会自动刷新页面
    port: 8666 //端口
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map' // 生成map文件方便调试
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}