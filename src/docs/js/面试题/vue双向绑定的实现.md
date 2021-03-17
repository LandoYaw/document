# 1. 原理
+ Observer 对所有数据的属性进行监听
+ Compile 对每个元素节点的指令进行扫描与解析 
+ Watcher 连接Observer与Compile ， 能够订阅接收到每个属性变动的通知，执行相应的cb

# 2. 实现
```js

let vm = new Vue({
    el: 'app',
    data: {
        text: '123'
    }
})

// 类
function Vue(options) {
    let data = this.data = options.data;
    observer(data, this);

    let id = options.el;
    let dom = nodeToFragment(document.getElementById(id), data);
    document.getElementById(id).appendChild(dom)
}

const observer = data => {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
}

// data属性添加访问器, 响应化属性对象
const defineReactive = (data, key, value) => {
    observer(value) // 遍历所有子属性
    const dep = new Dep()
    Object.defineProperty(data, key, {
        get: () => {
            if (Dep.target) {
                dep.addSub(Dep.target) // 添加一个订阅者
            }
            return value
        },
        set: (newValue) => {
            if (value === newValue) return
            value = newValue
            dep.notify() // 数据变化则通知所有订阅者
        }
    })
}

// 订阅器收集订阅者
const Dep = function () {
    this.subs = []
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub)
    },
    notify: function() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

// Watcher监听
const Watcher = function(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get(); // 将自己添加到订阅器中
}
Watcher.prototype = {
    update: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value
            this.cb.call(this.vm, value, oldVal)
        }
    },
    get: function() {
        Dep.target = this; // 缓存自己
        var value = this.vm.data[this.exp];
        Dep.target = null;
        return value
    }
}

```


# 4. 思路总结
+ Compile -> 解析HTML
  [newVue]的时候会通过[nodeToFragment]函数， 为每个节点生成[订阅者watch]， 
  在[newWatch]的时候触发[update]函数，函数会获取节点对应的属性值[this.value],
  以及将订阅者自身[Dep.target]保存至订阅器[Dep]的[subs]数组中。
+ Observer -> 拦截data添加访问器
  [get]的时候将上面[Dep.target]追加到[subs]中，
  [set]时，如果新旧数据发生了变化，那么就遍历[subs]触发每个[sub]的[update]方法
+ Watcher -> 订阅者， 连接Compile和Observer的桥梁