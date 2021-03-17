# call -> 参数是单个的
```js
function person(a, b) {
    return this.name+a+b
}
var obj = {
    name: 'Lee'
}
Function.prototype.myCall = function(context) {
    context = context || window
    var arr = []
    for(var i=1; i<arguments.length; i++) {
        arr.push(arguments[i])
    }
    context.fn = this
    var result = context.fn(...arr)
    delete context.fn
    return result
}

person.myCall(obj, 'aaa', 'bbbb')
```

# apply -> 参数是数组
源码同上

# bind -> 非立即执行，需要返回函数再执行
```js
Function.prototype._bind = function(context) {
    var fn = this
    // 参数
    var arr = []
    for(var i=1; i<arguments.length; i++) {
        arr.push(arguments[i])
    }
    return function() {
        return fn.apply(context, ...arr)
    }
}
```