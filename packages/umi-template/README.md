## 平安通基线版-采集数据模块
测试环境:
生产环境:

### 框架
* 项目框架 [umi](https://umijs.org/zh-CN/docs)
* 组件库 组件优先使用[antd-mobile](https://mobile.ant.design/docs/react/introduce-cn), 

### 代码规范
* 统一使用 FunctionComponent 配合 hooks 编写组件
* 路由、组件、store文件目录遵循umi规范

### git相关
* commit规范 [commitlint](https://github.com/arvinxx/commitlint-config-gitmoji/blob/master/README_zh-cn.md)
* commit规范配合 release 版本添加 changelog.md

### 打包环境
* yarn build:alpha // 开发&测试 环境1
* yarn build:beta // 开发&测试 环境2
* yarn build:zwwx_test // 政务微信测试
* yarn build:zwwx_prod // 政务微信线上
* yarn build // 线上H5

> 项目分支 
> **master** 线上版本、
> **dev** 同master 其余分支从dev拉取
> 发布版本分支 **release/xxx**
> 处理线上bug分支 **hotfix/xxx**
> 功能分支 **feature/xxx**


### CI 持续集成
* SonarQube 代码分析： [使用教程](https://www.yuque.com/hpze9d/aez3aw/pxwhfu)
* 


