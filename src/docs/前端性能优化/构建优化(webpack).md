# 减小资源体积
1、Tree-shaking
   * 生产模式自动启用， terser-webpack-plugin
   * package.json 中规避掉 sideEffects

# JS压缩
1、Webpack4后引入uglifyjs-webpack--plugin
2、支持ES6替换为terser-webpack-plugin (更高效)
3、生产模式，自动作用域提升  

# Babel7优化配置
* polyfill -> 兼容

* plugin-transform-runtime
class类打包时抽离出统一的

# webpack的依赖优化
1、noParse
   提高构建速度； 直接通知webpack忽略较大的库；不支持模块化引入方式的库
    module: {
        noParse: /loadash/
    }
2、DllPlugin
   避免打包时对不变的库重复构建
       entry: {
           react: ['react', 'react-dom']
       },
       output: {
           filename: '[name].dll.js',
           path: path.resolve(__dirname, 'dll'),
           library: '[name]'
       }, 
       plugins: [
           new webpack.Dllplugin({
               name: '[name]',
               path: path.resolve(__dirname, 'dll/[name].manifest.json')
           })
       ]
    2) webpack.config.js
       在plugins: [
           new DllReferencePlugin({
               manifest: require(`${__dirname}/dll/react/manifest.json`)
           })
       ]
    更适合开发环境

# 代码拆分
   单个bundle拆分成若干个bundles/chunks -> 缩短首屏加载时间
1、在入口entry中自定义入口
   [问题] 虽然拆分了，但是可能涉及重复的部分，重复打包
2、splitChunks
   提取共有代码；拆分业务代码与第三方库
   ```json
    optimazation: {
        splitChunks: {
            common: {
                name: ,
                test: ,
                chunks: 'all',
                minSize: 0
            }
        }
    }
   ```
3、动态加载
~~~js
import('../math').then()

// 例如动态加载组件
const Card = lazy(() => import('./Card'))
<Suspense fallback={<div>Loading</div>}>
~~~

# 资源压缩(minification)
[Minification]
* Terser压缩JS
* mini-CSS-extract-plugin压缩CSS
* HtmlWebpackPlugin-minify 压缩HTML

# 基于webpack的资源持久化缓存
打包文件增加hash值

# 大小监测和分析工具
1、Webpack Chart
   在线， webpack --profile --json > stats.json, 各个包的占比大小
2、source-map-explore 'build/*.js'
   webpack-bundle-analyzer 进行体积分析
3、speed-measure-webpack-plugin 速度分析

# React按需加载
1、React router基于webpack动态引入
2、使用Reloadable高级组件
   `npm install @loadable/component`
   ~~~js
   const LoadableAbout = loadable(() => import('./About.jsx'), {
       fallback: '<div>Loading</div>'
   })
   ~~~
