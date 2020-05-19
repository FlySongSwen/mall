/** 
 * 此处封装对db.json的数据库的增删改查CRUD的函数封装
 * 此处是对异步API的封装,这是nodejs的重点应用
 */
 
//查找数据函数
var fs = require('fs');

//将全局变量中的connection取出
let {connection} = global;

//舍弃回调函数传参的写法而使用Promise作为容器,resolve传参
 

 exports.findGoodById = async function (goodsId) {
    //  console.log(goodsId+'---------------------')
    return new Promise(async function (resolve,reject){
        var selectQuery = "SELECT Goods_id,Goods_name,Goods_price_1,Goods_price_2,Goods_oldPrice,Goods_store,Goods_sold,Goods_pics,Goods_introduce FROM goods WHERE goods.Goods_id =?"
        await connection.query(selectQuery,[goodsId], function (error, results) {
            if (error) throw error;    
            else{
                //将results解构到findResult中
                var findResult = 
                {
                        goodsId:results[0].Goods_id,
                        goodsName:results[0].Goods_name,
                        goodsPrice:[results[0].Goods_price_1 , results[0].Goods_price_2],
                        goodsOldPrice:results[0].Goods_oldPrice,
                        goodsStore:results[0].Goods_store,
                        goodsSold:results[0].Goods_sold,
                        goodsPics:JSON.parse(results[0].Goods_pics),
                        goodsIntroduce:results[0].Goods_introduce
                    }                
                //将findResult返回
                resolve(findResult);                
            }  
          })
    })
 }