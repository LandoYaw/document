# 1. keepalive
   + 缓存组件
   + 钩子
     actived, deactived
   + 参数
      include 包含的组件
      exclude 排除的组件
      max 缓存组件的最大值

# 2. new Vue() 发生了什么
   合并相关配置，初始化什么周期，初始化事件中心，初始化渲染，小护士话data, props, computed, watcher等

# 3. templatte编译过程
   + 解析器(parse)
      模板字符串转换成AST
   + 优化器(optimize)
      对AST进行静态节点标记，主要用来做虚拟DOM的渲染优化
   + 代码生成器(generate)
      使用AST生成render函数代码字符串 

# 4. Vue-template钩子函数
   + 全局守卫
     - beforeEach
     - afterEach
   + 路由守卫
     - beforeEnter
     - afterEnter
   + 组件守卫
     - beforeRouteEnter
     - beforeRouteUpdate
     - beforeRouteLeave

# 5. mixin
```js
const mixin = {
   methods: {
      foo: function() {
         console.log('1')
      },
   }
}
const vm = new Vue({
   mixins: [mixin],
   methods: {
      foo: function() {
         console.log('2')
      }
   }
})
vm.foo()  // 2
// 灵活度高，耦合度低，易于维护
```
     
# 6. computed
  vs data -> 更适用于复杂逻辑运算
  vs methods -> 更适用于需要缓存的计算

# 7. diff算法