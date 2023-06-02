//公共配置
import { Configuration, DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as dotenv from 'dotenv'
import WebpackBar from 'webpackbar'
//样式提取插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
const path = require('path')
// 加载配置文件
const envConfig = dotenv.config({
  path: path.resolve(__dirname, '../env/.env.' + process.env.BASE_ENV)
})

const styleLoaders = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
  {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[path][name]__[local]--[hash:5]'
      }
    }
  },
  // 添加 postcss-loader
  'postcss-loader'
]

const baseConfig: Configuration = {
  entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
  // 打包出口文件
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/', // 打包后文件的公共前缀路径
    assetModuleFilename: 'images/[hash][ext][query]' //这里自定义输出文件名的方式是，将某些资源发送到指定目录
  },
  // loader 配置
  module: {
    rules: [
      //多线程thread-loader，需要放在最前，如果项目不大没必要使用
      //exclude缩小构建目标
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: 'babel-loader'
      },
      {
        test: /\.css$/, //匹配 css 文件
        use: styleLoaders
      },
      {
        test: /\.less$/,
        use: [
          ...styleLoaders,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // 如果要在less中写类型js的语法，需要加这一个配置
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [...styleLoaders, 'sass-loader']
      },
      {
        test: /\.styl$/,
        use: [...styleLoaders, 'stylus-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 // 小于10kb转base64
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      },
      {
        // 匹配json文件
        test: /\.json$/,
        type: 'asset/resource', // 将json文件视为文件类型
        generator: {
          // 这里专门针对json文件的处理
          filename: 'static/json/[name].[hash][ext][query]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', 'less', 'css'],
    alias: {
      '@': path.join(__dirname, '../src')
    },
    //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索：
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'smatterer-react',
      filename: 'index.html',
      // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
      template: path.join(__dirname, '../public/index.html'),
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      // 压缩html资源
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, //去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, '../node_modules')
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(envConfig.parsed),
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackBar({
      color: '#85d', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false // 默认false，启用探查器。
    })
  ],
  //开启持久化存储缓存
  cache: {
    type: 'filesystem' // 使用文件缓存
  }
}

export default baseConfig
