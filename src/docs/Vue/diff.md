# 数据改变，vue怎么更新节点
渲染真实的DOM的开销很大，会引起整个DOM树的重绘和重排

先根据真是DOM生成一颗v-dom，当v-dom某个节点的数据改变后会生成一个新的vdom，然后新的vdom和旧的v-dom做对比，发现不一样的地方再直接修改在真实的DOM上，然后使vdom的值更新。

diff的过程就是调用名为patch的函数，比较新旧结点，一边比较一边给真实的DOM打补丁。

# v-dom和真实dom的区别
~~~js
// 真
<div>
  <p>123</p>
</div>

var Vnode = {
    tag: 'div',
    children: [
        {
            tag: 'p',
            text: '123'
        }
    ]
}
~~~


# diff算法的实现
~~~js
// 补丁类型
// patches = {
//    0: [{
//        type: 'ATTR',
//        attr: 'dskdj'
//    }, {
//        type: 'TEXXT',
//        attr: 'sda'
//    }]
//}
let patches = {}
let patchIndex = 0

function domDiff(oldVDom, newVDom) {
    let index = 0
    vNodeWalk(oldVDom, newVDom, index)
    return patches
}
// 递归dom节点
function vNodeWalk(oldNode, newNode, index) {
    let vnPatch = []
    
    if (!newNode) {
        vnPatch.push({
            type: 'REMOVE',
            index
        })
    } else if (typeof oldNode === 'string' && typeof newNode === 'string'){
        vnPatch.push({
            type: 'TEXT',
            text: newNode
        })
    } else if (oldNode.type === newNode.type){
        // 标签一样则比较属性
        const attrPatch = attrsWalk(oldNode.props, newNode.props)

        // 判断attrPatch是否为空
        if (Object.keys(attrPatch).length > 0) {
            vnPatch.push({
                type: 'ATTR',
                attrs: attrPatch
            })
        }
        // 递归子节点
        childrenWalk(oldNode.children, newNode.children)
    } else {
        vnPatch.push({
            type: 'REPLACE',
            text: newNode
        })
    }
    if (vnPatch.length > 0) {
        patches[patchIndex] = vnPatch
    }
}
// 遍历对比节点属性
function attrsWalk(oldAttrs, newAttrs) {
    let attrPatch = {}
    for (let key in oldAttrs) {
        // 修改了属性
        if (oldAttrs[key] !== newAttrs[key]) {
           attrPatch[key] = newAttrs[key]
        }
    }
    for (let key in newAttrs) {
        // 新增
        if (!oldAttrs.hasOwnProperty(key)) {
            attrPatch[key] = newAttrs[key]
        }
    }
    return attrPatch
}

// 递归子节点
function childrenWalk (odlChild, newChild) {
    oldChild.map((c, idx) => {
        vNodeWalk(c, newChilc[idx] ++vNodeWalk)
    })
}
~~~


# 更新DOM，打补丁
根据上面的patch 和 实际DOM的对比，把补丁加进去