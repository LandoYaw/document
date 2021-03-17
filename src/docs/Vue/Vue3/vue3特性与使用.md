# 一、 组合api
1. ref, reactive
   ref的本质 -> reactive({value: 30})

2. isRef, isReactive

3. shallowRef, shallowReactive
   非递归监听 -> 监听的数据量很大的时候使用， 因为递归监听很消耗性能

4. triggerRef
   某一个值

5. toRaw
   获取原始数据 -> 不追踪 -> 不修改UI -> 较少性能消耗
   ```ts
   let state = reactive(obj)
   let obj2 = toRaw(state)
   ```

6. markRaw
   -> 永久不能被追踪

7. toRef
   + ref(obj[key]) - 复制
     如果利用ref将某一个 对象中的属性编程响应式的数据，所修改的数据不影响原始数据 

   + toRef(obj, key) - 引用
     会影响原始数据， 但并不会触发UI改变；
     -> 如果想让响应式数据和之前的数据关联起来，并且更新响应式数据之后还不想更新UI

8. toRefs
    把对象中的多个属性变成响应式

9. customRef -> 自定义访问器
   + 示例
   ```ts
   customRef((track, trigger) => {
      return {
         get() {
            track()  // 告诉vue该数据需要追踪变化
         },
         set() {
            trigger() // 告诉vue触发UI更新
         }
      }
   })
   ```
   + 原因
   处理异步 -> 例如异步请求

10. ref获取DOM
    ```js
     // <div ref="box"></div>
     setup() {
        let box = ref(null)
        onMounted(() => {
           console.log(box.value)
        })
     }
    ```

11. readonly
    用于创建一个只读数据，递归也是只读
12. shallowReadonly
    仅第一层只读
    isReadonly
   
13. 响应式数据本质
   