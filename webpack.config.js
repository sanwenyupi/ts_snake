// 引入一个包
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack中的配置信息
module.exports = {
  
  // 入口文件
  entry: './src/index.ts',

  // 打包出口
  output: {
    // 打包目录
    path: path.resolve(__dirname, 'dist'),
    // 打包文件名
    filename: 'bundle.js',
    // 告诉webpack别用箭头函数
    environment: {
      arrowFunction: false,
      // 不使用const
      const: false
    }
  },

  // 指定webpack打包时使用的模块 
  module: {
    // 指定loader规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        use: [
          {
            // 配置babel
            // 指定加载器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置预定义环境
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "58",
                      "ie": "11"
                    },
                    // 指定corejs版本
                    "corejs": "3",
                    // 使用corejs的方式，usage按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader',
        ],
        // 排除文件
        exclude: /node_modules/ 
      },
      {
        // less文件处理
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // postcss
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },

  // 配置webpack插件
  plugins: [
    // 清空dist再打包
    // new CleanWebpackPlugin(),
    // 自动在目标文件夹生成index.html并引入相关资源
    new HTMLWebpackPlugin({
      // title: '自定义title'
      template: './src/index.html'
    }),
  ],

  // 设置引用模块
  resolve: {
    extensions: ['.ts','.js']
  }

}