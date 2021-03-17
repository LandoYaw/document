# 一、组件通讯
1、父子 
   $refs, $child, $emit/$on
2、兄弟  
   $parant, $root
3、祖裔
   provider-inject， 对象是双向绑定的
4、其他(all)
   vuex， Vue.observable, bus = new Vue()

# 二、插槽
1、匿名插槽
2、具名插槽
   父：`v-slot:content`
   子：`<slot name="content"></slot>`
3、作用域插槽
   父：`v-slot:content="{a, b}"`
   子：`<slot name="content" a=""></slot>`

#  三、组件化
$attrs, props之外的内容
async-validator
```js
// 仿照实现form表单的校验
// kIndex.vue


```