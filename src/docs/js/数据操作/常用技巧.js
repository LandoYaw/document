// 1 声明变量
let x, y = 20

// 2 多个变量赋值
let [a, b, c] = [1, 2, 3]

// 3 三元运算符
let result = marks > 30 ? '1' : '2'

// 4 默认赋值
let val = getValue() || 'sss'

// 5 与(&&)短路运算
if (isTrue) {
    handle()
}
// ->
isTrue && handle()

// 6 交换变量
let x = 'Hello', y = 55; 
//Longhand 
const temp = x; 
x = y; 
y = temp; 
// ->
[x, y] = [y, x];

// 7 箭头函数
// 8 模板字符串
// 9 多行字符串
// 10 多条件检查
includes 
indexOf

// 11 对象属性赋值
// key - value 一致

// 12 字符串转数字
let total = +'23'

// 13 重复一个祖父穿多次
// 不要再使用for循环
'string'.repeat(5)

// 14 指数幂
 //Longhand 
const power = Math.pow(4, 3); // 64 
// Shorthand 
const power = 4**3; // 64

// 15 双非位运算符(~~)
//Longhand 
const floor = Math.floor(6.8); // 6 
// Shorthand 
const floor = ~~6.8; // 

// 16 数组最大最小值
Math.max()
Math.min()

// 17 For循环
// for-in, for-of

// 18 合并数组
let arr1 = [20, 30]; 
//Longhand 
let arr2 = arr1.concat([60, 80]); 
// [20, 30, 60, 80] 
//Shorthand 
let arr2 = [...arr1, 60, 80]; 
// [20, 30, 60, 80]

// 19 深拷贝多级对象
//Shorthand 
const cloneObj = JSON.parse(JSON.stringify(obj));
//Shorthand for single level object
let obj = {x: 20, y: 'hello'};
const cloneObj = {...obj};

// 20 获取字符串中的字符
let str = 'jscurious.com'; 
//Longhand 
str.charAt(2); // c 
//Shorthand 
str[2]; // c
