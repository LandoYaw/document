# 1. Cookie + session的实现
问题：假如服务器集群，则要求session数据共享，每台服务器都能够读取session，实现成本较大。

# 2. JWT组成
header, payload, signature

# 3. JWT实现
```js
const token = jwt.sign({
    name: name
},'secret',{
    expiresIn: 60*60
})
```