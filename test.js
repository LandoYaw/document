let a = '123343543123145'
let val = '1'
function cal(a, val) {
    let strArr = a.replace(new RegExp(val, 'g'), '')
    return a.length - strArr.length
}
console.log(cal(a, val));  // 3