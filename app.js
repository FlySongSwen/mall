/*
app.js 入口模块
职责:
创建服务
做一些服务相关配置
模板引擎
body-parser解析表单post请求体
提供静态资源服务
挂载路由
监听端口启动服务
 */


var express = require('express')
var bodyParser = require('body-parser')
// var fs = require('fs')
var router = require('./router.js')    //router中express模块和fs模块都已加载
var app = express();





//配置模板引擎和body-parse 一定在app.use(router)挂载路由之前
app.use(bodyParser.urlencoded({ extended: false }))   //配置bodyParse以分析post
app.use(bodyParser.json())

//把路由容器挂载到app服务中
app.use(router);

app.listen(3000,function () {
    console.log('server is running at port 3000')
})