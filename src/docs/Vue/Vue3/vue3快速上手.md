# 1. fragment

# 2. emit
    避免事件与原有事件名称冲突后被调用两次
# 3. 自定义指令
    directive: (el, {value}) => {}

# 4. 自定义渲染器 custome renderer 

# 5. 父子组件绑定值 
    v-model:counter = "counter"  [子]@click="update: counter + 1"

# 6. 异步组件
defineAsyncComponent

# 7. suspense
[场景] 如果setup() 中有异步的请求值时, 会报错`async setup() is used without a suspense boundary`
<Suspense>
  <template #default>
    <User />
  </template>
  <template #fallback>
    <div>Loading</div>
  </template>
</Suspense>
如果时错误捕获的话用`onErrorCaptured`