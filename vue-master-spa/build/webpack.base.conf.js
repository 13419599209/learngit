// nodejs自带的path模块，包含路径操作的相关方法
var path = require('path')
var fs = require('fs')

// 引入当前文件夹下的utils
var utils = require('./utils')

// 读取配置，完整写法是'../config/index.js',不写完整路径的情况下，nodejs会自动读取文件夹下的index.js，具体可查阅《深入浅出node.js》
var config = require('../config')

// 加载vue-loader.conf.js 这里省略了.js后缀，nodejs会自动补全
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
    // path.join 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。(摘自 http://www.runoob.com/nodejs/nodejs-path-module.html)
    // __dirname nodejs模块提供的变量,获取当前模块文件所在目录的完整绝对路径。
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: { //入口配置
        app: './src/main.js' //webpack的入口文件名
    },
    output: { // 出口配置
        path: config.build.assetsRoot, // 出口文件的路径
        filename: '[name].js', // 出口文件名
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath // publicPath指定打包后静态资源的路径
    },
    resolve: {
        // 在使用import时文件后缀自动补全。如 import demo from './demo.vue' 可写成 import demo from './demo'
        // 注意:我看见有些文章说要正确解析完整路径（例如： import demo from './demo.vue'），extensions数组中要加一个空字符串，我测试过已经不用增加一个空字符串也能正确解析完整路径了
        extensions: ['.js', '.vue', '.json'],
        // 设置一些常用路径指代
        // 例如 import Vue from 'vue$'，等价于  import Vue from 'vue/dist/vue.common.js'
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    // 加载各种loader
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //引入第三方类库时，如果第三方类库的js是es6语法，应先把es6转es5，在压缩
                include: [resolve('src'), resolve('/node_modules/_vue-picture-preview@0.0.1@vue-picture-preview/index.js'), ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, //在10k以下的图片文件以base64的形式内联在代码中，减少http请求数
                    name: utils.assetsPath('media/[name].[hash:7].[ext]') //指明了输出的命名规则
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}