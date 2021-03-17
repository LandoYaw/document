# 三、CSS优化
## 1.  DRY, don't repeat yourself
  - 删除未使用到的样式 npm install -g uncss
    uncss http://localhost:8080-i .modal.open > css/style.clean.css
  - 预编译器
    LESS & SASS
    [问题] 编译后的CSS样式会过于具体。嵌套越深，问题越大。过于具体的选择器也会延长渲染时间
  - 分割CSS
## 2. 移动优先即用户优先
  Mobile-Friendly Test
## 3. 对CSS进行性能调整
  + 避免使用@import
      - 与<link>标签不同，在下载整个样式表之前，不会处理样式表中的@import指令，这种行为导致网页的总加载时间延迟
      - @import是串行请求， 而<link>是并行请求
  + <head>中放置CSS
    - 无样式内容的闪烁问题
    - 在加载时提高页面的渲染性能
  + 防止无样式内容闪烁
  + 选择器的权重
    标签 > 后代 > 类 > 直接子元素 > 过度定义 > 兄弟 > 伪类 > 属性
  + 尽可能使用flexbox

## 4. 使用CSS过渡
  + transition
  + will-change


# 四、理解关键CSS
# 1. 解决的问题
   [关键CSS]用户会立即看到的内容样式， 首屏样式。需要尽快加载。
+ 渲染阻塞
  内联样式不会阻塞， 但css无法缓存。
  preload -> 不会阻塞
 # 2. 实现关键CSS
  
