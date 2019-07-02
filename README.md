# 前端开发环境配置以及基本开发教程

## 项目结构

```
client #主目录
|-build #webpack多环境配置文件目录
|-config #webpack多环境配置文件目录
|-dist #执行npm run build 构建项目之后生成的文件夹，里面是打包好的项目文件
|-node_modules #执行npm install 之后生成的文件夹，相关的依赖包都在这里面
|-src #项目源码主目录
  |-assets
  |-components #通用组件
  |-http #ajax请求封装方法
  |-router #vue-router
  |-utils #通用封装方法
  |-views #业务页面
  |-vuex
    -state.js
    -store.js
   -App.vue
   -main.js #主程序入口
|-static
 -index.html #html入口
 -package.json #npm配置文件
```

## 开发环境配置

### 安装NodeJS
> 版本10.15.3

## 开发工具

> Webstorm 或者 HBuilderX

## 基本开发教程

### vue教程

[Vue起步](https://cn.vuejs.org/v2/guide/index.html)

[Vue菜鸟教程](http://www.runoob.com/vue2/vue-tutorial.html)

### 项目打包运行

``` bash
# 首先安装依赖包
npm install

# 在本地以开发模式启动
npm run dev

# 项目构建
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

### 封装的相关方法

#### this.$http.get(url,parms,isLoading)

```
该方法用于发送get请求,该方法为异步方法
url #参数1，请求路径
parms #参数2，传给后台的数据
isLoading #参数3，在发送请求期间页面是否显示加载中
```

#### this.$http.post(url,data,isLoading)

```
该方法用于发送post请求,该方法为异步方法
url #参数1，请求路径
data #参数2，传给后台的数据
isLoading #参数3，在发送请求期间页面是否显示加载中
```
#### this.$http.all(var1,isLoading)

```
该方法用于同时发送多个请求,该方法为异步方法
var1 #参数1，类型为数,请求路径，格式如下：
[{
    method:'get or post',
    url:'your url',
    params:{},#get方法的数据
    data:{}#post方法的数据
},...]
isLoading #参数2，在发送请求期间页面是否显示加载中
```

#### this.$mm.success(message)

```
该方法用于在页面上弹出成功提示框
message #参数1，提示的文字
```

#### this.$mm.error(message)

```
该方法用于在页面上弹出错误提示框
message #参数1，提示的文字
```
#### this.$mm.delete(_then,_catch)

```
该方法用于在删除时提示框
_then #参数1，确认事件
_catch #参数2，取消事件
```
### this.$mm.activate(_then,_catch)

```
该方法用于在激活时提示框
_then #参数1，激活事件
_catch #参数2，不激活事件
```

#### 后续如果封装更多的方法，将会继续更新