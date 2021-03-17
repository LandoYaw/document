// 1、数组扁平化处理

// 1) 递归
// function flat(arr, newArr){
//   for (let i=0;i<arr.length;i++) {
//         if (Array.isArray(arr[i])) {
//             flat(arr[i], newArr)
//         } else {
//             newArr.push(arr[i])
//         }
//     }
//     return newArr
// }

// 2) tostring方法
// function flatten(arr) {
//     return arr.toString().split(',').map(item => Number(item))
// }

// 3) ES6数组拓展方法flat, 测试报错
// function flatten(arr) {
//     return arr.flat(Infinity)
// }

// 4）数组的reduce方法
// function flatten(arr) {
//     return arr.reduce((a, b) => [].concat(Array.isArray(a) && a ? flatten(a):a, Array.isArray(b) ? flatten(b) : b),[])
// } 
// console.log(flatten([1, [2, [5,4]]]))


// 2、模版字符串解析
function str(str, obj) {
    var camelizeRE = /\$\{[a-zA-Z]+\}/g;
    var newStr = str.replace(camelizeRE,
    function() {
        console.log('arguments', arguments[0])
        let result = arguments[0]
        let keys = Object.keys(obj)
        for (let i = 0; i<keys.length;i++) {
            if (arguments[0].includes(keys[i])) {
                result = obj[keys[i]]
                break
            }
        }
        return result
    })
    return newStr
}
str('${name}-${age}-${sex}', {name: 'Lee', age: 20, sex: '男'})


// 3、超大数相加
function sumBigNums(a,b){
    let carry = 0, res = ' ';
    a = a.split("");
    b = b.split("");
    while(a.length || b.length || carry){
         carry += ~~a.pop() + ~~b.pop();
         res = (carry%10) + res;
         carry = carry > 9;
    }
    return res.replace(/^0+/, '');

 }

 // hash表增快查询速度
 function filter(data, selectedIds) {
     // 旧写法， 数据量增大时会出现卡顿
     // return data.filter(id => selectedIds.includes(id))
     // 新写法
     let ids = {}
     selectedIds.forEach(id => ids[id] = 1);
     data.filter(id => !!ids[id])
 }

 // Promise 实现红灯-3s，黄灯-1s，绿灯-2s量一次
 // Promise的链式调用
 function red() {
     console.log('red');
 }
 function yellow() {
    console.log('yellow');
}
function green() {
    console.log('green');
}
let light = (timer, cb) => {
    return Promise(resolve => {
        setTimeout(() => {
            cb()
            resolve()
        }, timer)
    })
}
let step = Promise.resolve()
.then(() => {
    return light(3000, red)
})
.then(() => {
    return light(2000, green)
})
.then(() => {
    return light(1000, yellow)
})
step()

// 加载图片，最多3张 
var urls = []
function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            console.log('单张图片加载完成');
            resolve()
        }
        img.onerror = reject
        img.src = url
    })
}
function limitLoad(urls, handler, limit) {
    // 拷贝数组
    const sequence = [...urls]
    let promises = []
    // 并发请求最大数
    promises = sequence.splice(0, limit).map((url, index) => {
        // index为任务再promises中的index，用于在Promise.race之后完成的任务脚标
        return handler(url).then(()=>{
            return index
        })
    })
    // 利用数组的reduce方法以队列形式执行
    return sequence.reduce((last, url, currentIndex) => {
        return last.then(() => {
            return Promise.race(promises)
        }).catch(err => {
            console.log(err);
        }).then(res => {
            promises[res] = handler(sequence[currentIndex]).then(() => {
                return res
            })
        })
    }, Promise.resolve()).then(()=> {
        return Promise.all(promises)
    })
}
limitLoad(urls, loadImg, 3)