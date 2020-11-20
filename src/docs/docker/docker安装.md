# 下载
[DockerToolbox](https://www.docker.com/products/docker-toolbox)

# 安装与配置
(1) 勾选Install VirtualBox with...
(2) 文件保存路径更改：
    Git Bash -> `notepad .bash_profile` -> 文档中加入内容：export MACHINE_STORAGE_PATH='E:\docker'
(3) 然后在E盘创建文件夹 docker， 内部再创建 cache， 将安装目录下的 boot2docker.iso 拷贝到该文件夹下
(4) CMD， 运行`docker-machine` 看是否安装成功
(5) 然后 `docker-machine env default`, 如果报错找不到default，那么创建一个 `docker-machine create -d virtualbox default`
(6) 完了打开 Docker Quickstart Terminal 自动启动， 如果报错，那么断网重试