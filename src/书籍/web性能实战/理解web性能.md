# 1. 优化网站
   npm install -g minifier html-minify
    + CSS 压缩
     minify -o style.min.css style.css
    + JS 压缩
     minify 上同， 可以压缩jquery或者behaviour等
    + html压缩
     htmlminify
     但通常html的display会受到影响，并且html不大，因此一般不做压缩

# 2. 评估工具
+ pageSpeed chrome Analytics
+ performance
  - 火焰图
  - [jank]：指交互和动画效果卡顿，或未能顺利渲染
    [帧]：浏览器在每秒显示时间内所做的工作量

    time fired 会调用一个定时器，从而造成卡顿
    