# 1. ES7概念，源于python
是对类、函数、属性之类的一种装饰，可以针对其添加一些额外的行为。通俗理解就是在原有代码外层包装一层处理逻辑，是Object.defineProperty的语法糖

# 2. why
有些时候，可能要对传入参数的类型判断，对返回值排序、过滤，对函数添加节流防抖等功能性代码，基于多个类的继承，各种各样的与函数逻辑本身无关的重复性的代码。

# 3.示例
```js
class Person {
  @readonly
  name() { return `${this.first} ${this.last}` }
}
function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}
```
