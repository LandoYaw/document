# react hooks
## 1、useState
~~~js
import React, { useState } from 'react'

export default function UseState() {
    let [a, setA] = useState({
        name: 'Lee',
        age: 18
    })
return <div onClick={() => setA({...a, name: 'Chaw'})}>{a.name}:{a.age}</div>
}
~~~

## 2、useEffect
**副作用-> 生命周期函数**
~~~js
useEffect(()=>{
        console.log('ppppp');
        return ()=>{
            console.log('===');
        }
    },[])
~~~
在return中添加销毁的钩子函数，第二个参数是个数组，当[]为空时，只执行一次， 内置值的话， 当值的状态变动则会触发副作用函数


## 3、useContext
父子组件传值
~~~js
// 1、创建全局的context
import { createContext, useContext } from 'react'
import Child from './Child'
const CreateContext = createContext({})
// 2、传递参数
<CreateContext.Provider value={a}>
    <Child />
</CreateContext>
// 3、接受参数
userContext(CreateContext) // 即可接收到父组件传递的参数
~~~


## 4、useReducer
状态管理 


## 5、useContext 和 useReducer实现redux功能
~~~js
import React, { createContext, useReducer } from 'react'

export const ColorContext = createContext({})

const initState = {
    color: 'blue'
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'red':
            return {
                color: 'red'
            }
        default:
            return {
                color: 'blue'
            }
    }
}

export const Color = (props) => {
    const [color, dispatch] = useReducer(reducer)
    return (
        <ColorContext.Provider value={{color, dispatch}}>
            {props.children}
        </ColorContext.Provider>
    )
}


// Dispath事件触发
import React, {useContext} from 'react'
import { ColorContext } from './color'

function Buttons() {
    const { dispatch } = useContext(ColorContext)
    return (
        <div>
            <button onClick={() => dispatch({
                type: 'red'
            })}>红色</button>
            <button onClick={() => dispatch({
                type: 'blue'
            })}>蓝色</button>
        </div>
    )
}

export default Buttons

// 此处漏写了一步，Child组件中套Buttons组件
~~~


## 6、useMemo
解决子组件重复执行的问题
`UserMemo(()=> {某些方法}, [name])`
其中name状态改变后才会触发方法的执行


## 7、useRef
操作DOM


## 8、自定义hooks
~~~js
import { useCallback, useEffect. useState } from 'react'

function useWindowSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })
    const onResize = useCallback(()=>{
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }, [])
    useEffect(()=>{
        window.addEventListene('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    })
    return size
}
~~~
