// 1、主函数main || index 中
import {
    render,
    mountDom
} from './test/myDom.js'
console.log('rr', render)
var vDom = {
    tag: 'div',
    content: 'divdvd',
    attr: {
        id: 'content',
        className: 'content'
},
children: [
        { tag: 'p', content: 'p' },
        { tag: 'ul', attr: { className: 'list-group' } }
    ]
}

// 转化成真实的dom
const rDom = render(vDom)
// dom挂在
mountDom(rDom, document.getElementById('app'))

// 2、上述函数的实现

function  setAttrs(node, prop, value) {
    console.log('object, prop', prop);
    switch(prop) {
      case 'value': {
        if (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA') {
          node.value = value
        } else {
          node.setAttribute(prop, value)
        }
        break
      }
      case 'style': {
        node.style.cssText = value
        break
      }
      case 'content': {
        console.log(node, '8');
        node.nodeValue = value
        break
      }
      default:
        node.setAttribute(prop, value)
    }
  }
  // 虚拟dom转换为真实的dom结构
  function render (vDom) {
    const { tag, attr, children, content } = vDom
    const el = document.createElement(tag)
    // 节点设置属性
    if (attr) {
      for (let key in attr) {
        setAttrs(el, key, attr[key])
      }
    }
    // 有内容直接加内容
    content && (el.innerHTML = content)
    children && children.map(i => {
      i = render(i)
      el.appendChild(i)
    })
    return el
  }
  
  // 挂在DOM
  function mountDom (rDom, root) {
    root.appendChild(rDom)
  }
  
  export {
    render,
    mountDom
  }
  