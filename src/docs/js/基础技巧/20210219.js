// 1. 常用运算符号

// 1) 非空运算符 -> ?? 
3 ?? 5  // 5
undefined ?? 5 // 5
// 2) 非空赋值 ??=
// 3) 链式查找 ?.
let obj = {
    p: {
        o: 2
    }
}
obj.p ?.o // 2
let obj1 = {}
obj1.p ?.o // undefined
// 4) 三元运算符 ? :


// 2. 双冒号运算符:: 用来取代bind, call和apply
// foo::Bar 等同于
bar.bind(foo)

// 3. Symbol
/*
Symbol() 生成的值唯一，解决对象属性太多属性名冲突覆盖的问题
对象中Symbol()属性不能被for in 遍历， 但是也不是私有属性
 */

// 4. Set 集合
// 5. Map
/*
可以理解为Object的超集，打破了以传统键值对形式定义对象，对象的key不再局限于字符串。可以更加全面的描述对象属性
*/

// 6. Proxy
let obj = {} // 待拦截的对象
function createObj() {
    return new Proxy(obj, {
        get(target, proxyKey) {},
        set(taeget, proxyKey, value) {}
    })
}

// 7. Reflect
/*
1. 将原生的一些零散分布的Object, Function或者全局函数里的方法(如apply, delete, get, set), 统一整合到Reflect上，方便统一的管理一些原生API
2. 因为Proxy可以改写默认的原生API, 如果一旦原生API被改写可能找不到, 因此用Reflect做备份
 */

// 8. Iterator 遍历器 -> 只是一种概念
/*
Set和Map无法for in遍历，因此：
1. 为Set和Map单独新增一个用来遍历的API
2. 为Object, Array等等新增一个统一遍历的API
*/
// obj.[Symbol.iterator]() 就是Iterator遍历器
let obj = {
    data: ['hello', 'world'],
    [Symbol.iterator]() {
        const self = this
        let index = 0
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    }
                } else {
                    return {
                        value: undefined, done: true
                    }
                }
            }
        }
    }
}

// 9. for...in 和 for...of 区别
/*
1. for...of -> Iterator
2. for...in -> 仅能遍历对象
*/

// 10. Generator
/*
Iterator遍历器是Iterator的具体实现，那么Generator函数可以说是Iterator接口的具体实现方式
*/
// 传统函数
function foo() {
    return 'foo'
}
foo() // foo
// Generator函数
function *gene() {
    yield '1'
    yield '2'
    return 'gene'
}
let iterator = gene()
console.log(iterator.next()); // { value: '1', done: false }
console.log(iterator.next()); // { value: '2', done: false }
console.log(iterator.next()); // { value: 'gene', done: true }

// 11. Proxy代替defineProperty
/*
1) Object.defineProperty() 直接在一个对象上定义新属性，或者修改一个对象的现有属性，并返回此对象
问题：无法劫持删除或者添加的对象属性；
     数组API方法无法监听到
     需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题
 */
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                val = newVal
            }
        }
    })
}
/*
2) Proxy直接监听的是一个对象
*/
function reactive(obj) {
    if (typeof obj !== 'object' && obj !== null) {
        return obj
    }
    // Proxy相当于在对象外层拦截
    const observed = new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            return res
        },
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            return res
        },
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            return res
        }
    })
    return observed
}


// 12. rem布局方案
/*
设备像素比(dpr) = 物理像素 / 设备独立像素(px)， 用window.devicePixelRatio获取
1) 1px的粗细问题
dpr为1，那么1px就是一个物理像素， 但是多倍屏，例如二倍屏下(dpr为2)，1px的独立像素就为2px的物理像素，被撑大。而0.5px只会被识别成0px。
2) 解决：
1. border-shadow
2. transform
3. <meta name='viewport' content='initial-scale=1' />
   rem 适配方案
    html { 
        font-size: 1px; 
    }  
*/