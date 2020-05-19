var express = require('express')
var fs = require('fs')
var mysql = require('mysql');
var superagent = require('superagent');

//创建对数据库的连接,挂载再全局变量中
global.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mall'
  });
  
//连接到数据库
global.connection.connect();

var category = require('./CRUD/category');
var goodsDetail = require('./CRUD/goodsDetail');
var users = require('./CRUD/users');
var Order = require('./CRUD/order');
var search = require('./CRUD/search');
var {uuid} = require('./utils/uuid');



/**
 * router.js路由模块
 * 职责:
 *      处理路由
 *      根据不同的请求方法+请求路径设置具体处理方法
 *      模块职责要单一
 *      |  请求方法 | 请求参数  | get参数  |
 *      |----------|-----------|---------|
 *      get         /home/swiperdata       
 *      get         /home/catitems
 *      get        /home/flooritems
 *      
 * 
 */

//express推荐方法
//1.创建一个路由容器
var router =express.Router()
var homeData= {};


//取出所有主页静态数据
fs.readFile('./staticData/home_data.json',function (err,data) {
    if (err)
        console.log("读取失败")
    else{
        homeData = JSON.parse(data);
        // console.log(homeData);
    }
        
})
//测试
router.get('/', function (req,res) {
    
    res.send({
        a:"asdfasdf"
    })
})
//2.把路由都挂在到router路由容器中
router.get('/home/swiperdata', function (req,res) {
    // console.log(homeData.swiperdata)
    res.send({
        swiperdata:homeData.swiperdata
    })
})

router.get('/home/catitems', function (req,res) {
    // console.log(homeData.catitems)
    res.send({
        catitems:homeData.catitems
    })
})

router.get('/home/flooritems', function (req,res) {
       
    res.send({
        flooritems:homeData.flooritems 
    })
})

router.get('/category/catitems', async function (req,res) {    
    res.send({
        catitems:await category.find()
    })
})

router.get('/category/goods', async function (req,res) { 
    // console.log(req.query)   
    var {catId} = req.query
    catId = Number.parseInt(catId);
    var goods=await category.findGoodsById(catId)
    // console.log(goods)
    res.send({
        goods
    })
    
})

router.get('/goodsDetail/good', async function (req,res) { 
    // console.log(req.query)   
    var {goodsId} = req.query
    goodsId = Number.parseInt(goodsId);
    res.send({
        goodsDetail:await goodsDetail.findGoodById(goodsId)
    })
})


router.post('/users/wxlogin', async function (req,res) { 
    // console.log(req.body);

    var{userInfo,code,address} = req.body;
    //请求openId
    superagent.get('https://api.weixin.qq.com/sns/jscode2session')
    .query({
        appid:'wx1fbb084be948a99c',
        secret:'47532553a7ae51742ac3c51c3d3919e0',
        js_code:code,
        grant_type:'authorization_code'
    })
    .end((err,response)=>{
        if (err)
            console.log(err)
        else{
            //发送openid到前台
            res.send(response.text);
            var {openid} = JSON.parse(response.text) ;
            users.save({
                id:openid,
                nickname:userInfo.nickName,
                avatar:userInfo.avatarUrl,
                phone:address.telNumber,
                name:address.userName,
                address:address.all,
            })
        }
            
    })
})


//生成订单
router.post('/pay/order', async function (req,res) { 
    // console.log(req.body);
    let {order,openid,amount,total} = req.body;
    let orderId = uuid();
    let orderStatus = 0;  
    Order.save({
        order,openid,amount,total,
        orderTime:new Date(),
        orderId,
        orderStatus
    })
    res.send(orderId);
    
})

//获取订单信息
router.get('/order/find', async function (req,res) { 
       
    let orders = await Order.find(req.query);    
    res.send(orders)
})

//获取订单详情
router.get('/order_detail/find', async function (req,res) { 
    let {orderId} = req.query;
    let order_detail = await Order.findById(orderId);    
    res.send(order_detail)
})

//获取搜索信息
router.get('/search', async function (req,res) { 
    let {value} = req.query;
    let goods = await search.find(value);

    res.send({goods})
})


//将router导出
module.exports = router

