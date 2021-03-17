// 1、小数取整
var a = ~~2.33
var b = 2.33 | 0
var c = 2.33>>0

// 2、随机字符串
Math.random().toString(16).substring(2)

// 3、金额格式化
var a = '1234567890'
var format = a.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
console.log(format) // 1,234,567,890

// 4、最佳的让两个整数交换数值
var a = 1, b = 2
a += b
b = a - b
a -= b
// 缺点：整形数据溢出

// 5、JSON深拷贝
var b = JSON.parse(JSON.stringify(a))

// 6、数组去重
var a = [...new Set([1, '1', 1, 2, 3])]

// 7、用最短的代码实现一个长度为m(6)且值都n(8)的数组
Array(6).fill(8)

// 8、短路表达式
var a = b && 1
    // equal
if (b) {
    a = 1
} else {
    a = b
}

var a = b || 1
    // equal
if (b) {
    a = b
} else {
    a =1
}

// 9、取出数组中的最值
var num = [2, 4, 10, 1, 5]
var min = Math.min.apply(Math, num)

// 10、将arguments对象转换成数组
var argArr = Array.prototype.slice.call(arguments)

var argArray = Array.from(arguments)

// 11、js的Function构造函数
var f = new Function('a', 'alet(a)')
// 第一个为传入的参数名，， 第二个为函数内的执行代码