/** 
 * 此处封装对db.json的数据库的增删改查CRUD的函数封装
 * 此处是对异步API的封装,这是nodejs的重点应用
 */
 
//查找数据函数
var fs = require('fs');

//将全局变量中的connection取出
let {connection} = global;

exports.save =  function (para) {
    return new Promise(async function (resolve,reject){
        // console.log(para)
        //插入order_表
        let {order,openid,amount,total,orderId,orderStatus,orderTime} = para;
        let insertOrderSql = "insert into order_(Order_id,Cus_id,Order_money,Order_total,Order_status,Order_time) VALUES(?,?,?,?,?,?)"
        await connection.query( insertOrderSql ,[orderId,openid,amount,total,orderStatus,orderTime],function (error, results) {
            if (error) throw error;   
            else console.log("insert into  order_ success")
        })

        //插入order_info表
        //处理数据
        let orderInfo = order.map(v => [orderId,v.goodsId,v.count]);

        let insertOrderInfoSql = "insert into order_info(Order_id,Goods_id,Goods_amount) VALUES ?";
        await connection.query(insertOrderInfoSql,[orderInfo],function (error,results){
            if (error) throw error;   
            else console.log("insert into order_info success");
        })
        
    
 })
}

exports.find =  function (para) {
    return new Promise(async function (resolve,reject){
        let {openid,type} = para;
        // console.log(openid,typeof(type)
        //搜索order_表
        let selectOrderSql = '';
        let sqlArray = []; 
        let orders = [];
        
        
        if (type==='0' || type==='1' ||type==='2'){
            selectOrderSql="SELECT Order_id,Order_money,Order_money,Order_total,Order_time,Order_status FROM order_ WHERE Cus_id=? and Order_status=?" ;
            sqlArray = [openid,type];
        }else{
            selectOrderSql = "SELECT Order_id,Order_money,Order_money,Order_total,Order_time,Order_status FROM order_ WHERE Cus_id=?" ;
            sqlArray = [openid];
        }
        //查询用户所有订单
        await connection.query(selectOrderSql,sqlArray,async function (error,results){
            if (error) throw error;   
            else
            //查询每一个订单的商品的信息
                for (let i=0;i<results.length;i++){
                    orders.push(await getGoods(results[i]));
                }
            
            // console.log(orders)
            resolve(orders);
        });  
    
 })
}

exports.findById =  function (orderId) {
    return new Promise(async function (resolve,reject){
        let selectOrderSql="SELECT Order_id,Order_money,Order_money,Order_total,Order_time,Order_status FROM order_ WHERE Order_id=? " ;
        //查询订单信息
        await connection.query(selectOrderSql,[orderId],async function (error,results){
            if (error) throw error;   
            else{
                //查询订单的每一个商品信息
                // console.log(results)
                let selectGoodsSql= "SELECT * FROM order_info WHERE order_id=?";
                await connection.query(selectGoodsSql,[orderId],async function (err,rs){
                    let goods=[];
                    if (error) throw error;   
                    else{
                        for(var i=0;i<rs.length;i++){
                            goods.push(await getGoodsById(rs[i].Goods_id,rs[i].Goods_amount));
                        }
                        //返回订单详情
                        let status;
                        switch (results[0].Order_status){
                            case 0:status='待发货';break;
                            case 1:status='待收货';break;
                            case 2:status='售后';break;
                            case 3:status='退货';break;
                        }

                        resolve({
                            orderId:results[0].Order_id,
                            time:results[0].Order_time.toLocaleString(),
                            amount:results[0].Order_money,
                            total:results[0].Order_total,
                            status,
                            goods
                        })
                    }
                })
                
                
            }
            
               
            
        });  
        
    
 })
}


function getImages(goods) {
    return new Promise(async (resolve,reject)=>{
        await connection.query("select Goods_pics from goods where Goods_id=?",[goods.Goods_id],(err,rs)=>{
            if (err) throw err;
            else   {
                resolve(JSON.parse(rs[0].Goods_pics)[0].src_medium);
                
            }
        })
    })    
}



function getGoods(order) {
    return new Promise(async (resolve,reject)=>{
        let selectGoodsSql = "select Goods_id from order_info where Order_id=?";
            await connection.query(selectGoodsSql,[order.Order_id],async function (err,rs){
                if (err) throw err;  
                else{
                    //获取订单中的商品图片
                    let images=[];
                    for (var j=0;j<rs.length;j++){
                        //查询图片
                        images.push(await getImages(rs[j]));
                    }
                    let status;
                    switch (order.Order_status){
                        case 0:status='待发货';break;
                        case 1:status='待收货';break;
                        case 2:status='售后';break;
                        case 3:status='退货';break;
                    }
                    //返回这一订单信息
                    resolve({
                        orderId:order.Order_id,
                        time:order.Order_time.toLocaleString(),
                        amount:order.Order_money,
                        total:order.Order_total,
                        status,
                        images
                    })
                    
                }
            })
    })    
}

function getGoodsById(goodsId,amount) {
    return new Promise(async (resolve,reject)=>{
        var selectQuery = "SELECT Goods_id,Goods_name,Goods_price_1,Goods_price_2,Goods_oldPrice,Goods_pics FROM goods WHERE goods.Goods_id =?"

        await connection.query(selectQuery,[goodsId],(error,results)=>{
            if (error) throw error;
            else   {
                
                var findResult = 
                {
                    goodsId:results[0].Goods_id,
                    goodsName:results[0].Goods_name,
                    goodsPrice:[results[0].Goods_price_1 , results[0].Goods_price_2],
                    goodsImage:JSON.parse(results[0].Goods_pics)[0].src_medium,
                    count:amount
                    
                }                
                resolve(findResult);
            }
        })
    })    
}

