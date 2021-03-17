# 解构
1. 
```js
let x;
{x} = {x:1}
// 上述JS引擎会将{x}识别为代码块，因此会报语法错
({x} = {x:1}) // 如此执行则正常
```
2. 字符串解构
```js
let {length: len} = 'hello'
len // 5
```
3. 注意不用()，可能报错， 解构用途
+ 交换变量值
+ 从函数返回多个值
+ 函数参数定义
+ 提取JSON数据
+ 函数参数得默认值
+ 遍历Map结构
+ 输入模块的指定方法

# 字符串的扩展/新增方法
1. 
```js
String.raw({
  raw: ['foo', 'bar', 'baz']
}, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'
```
2. startsWith, endsWith, includes
3. padStart, padEnd字符串补全, ES2017
`'x'.padStart(5, 'ab')` // ababx
4. trimStart, trimEnd -> 消除空格

# 正则的扩展
1. 字符串的正则方法
match, replace, search, split
2. 
+ 点(.)字符是除了换行符之外的任意单个字符
+ {} -> 组匹配
```js
const reg = /(\d{4})-(\d{2})-(\d{2})/
const matchObj = reg.exec('2020-09-01')
matchObj[0] // 2020
// ES2018具名组匹配
const reg1 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
macth.groups.year

let re = /(?<year>d{4})-(?<month>d{2})-(?<day>d{2})/
'2020-09-09'.replace(re, '$<day>/$<month>/$<year>')
```
+ 解构赋值和替换
```js
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar')
```
+ 引用具名组匹配 \k<组名>, 或者\1, 或者二者同时
```js
const re = /^(?<word>[a-z]+)!\k<word>$/
re.test('abc!abc') // true
```
+ index, indices

# 数值的扩展
1. Number.isNaN, Number.isFinite
2. Math对象的扩展
+ Math.trunc() -> 去除一个数的小数部分，返回整数
+ Math.sign() -> 正+1，负-1，0

# 函数的扩展
1. rest 代替arguments
2. name属性
3. 箭头函数
   +  this -> 定义时所在的对象
   ```js
    function Timer() {
        this.s1 = 0;
        this.s2 = 0;
        // 箭头函数
        setInterval(() => this.s1++, 1000);
        // 普通函数
        setInterval(function () {
            this.s2++;
        }, 1000);
    }
    var timer = new Timer();
    setTimeout(() => console.log('s1: ', timer.s1), 3100);
    setTimeout(() => console.log('s2: ', timer.s2), 3100);
    // s1: 3
    // s2: 0
   ```
   + 不new
   + 不 argument
   + 不 yield
4. 尾调用
   Tail Call: 某个函数的最后一步是调用另一个函数
5. 调用帧 -> 调用栈
   用内层函数的调用帧取代外层函数的调用帧。
```js
function f() {
    let m = 1
    let n = 2
    return g(m+n)
}
f()
// 等同于
function f() {
    return g(3)
}
f()
// 等同于
g(3)
```
如果函数g不是尾调用，函数f就需要保存内部变量m和n的值，g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除f(x)的调用帧， 只保留g(3)的调用帧。
[调用帧优化]：只保留内层函数的调用帧，节省内存。注意：需要不再用到外层函数的内部变量。
5. 尾递归
函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
递归非常耗费内存，因为需要同时保存成百上千的 调用帧，很容易发生“栈溢出”。但对于尾递归而言，由于只存在一个调用帧，所以不会溢出 [stack-overflow]
```js
function f(n){
    if (n===1) return 1
    return n*f(n-1)
}
// 最多需要保存n个调用记录，复杂度O(n)。改成尾递归，就是O(1)
function fn(n) {
    f1(n, 1)
}
function f1(n, result) {
    if (n===1) return result
    return f1(n-1, result*n)
}

```
6. 尾递归的优化
   尾调用只在严格模式下生效。 采用"循环""换掉"递归的方式减少调用帧
   [蹦床函数]

# 数组的扩展

# Symbol
1. 用来唯一值
```js
let s1 = Symbol()
let s2 = Symbol()
s1 === s2 // false
// 带相同参数也不相等
```
2. 不能和其他值进行运算
   但可以转字符串， 可以转布尔值
   


