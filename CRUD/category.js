/** 
 * 此处封装对db.json的数据库的增删改查CRUD的函数封装
 * 此处是对异步API的封装,这是nodejs的重点应用
 */
 
//查找数据函数
var fs = require('fs');

//将全局变量中的connection取出
let {connection} = global;

//舍弃回调函数传参的写法而使用Promise作为容器,resolve传参
 exports.find =  function () {
    return new Promise(async function (resolve,reject){
        var selectQuery = "select * from category"
        await connection.query(selectQuery, function (error, results) {
            if (error) throw error;    
            else{
                var findResult = [];
                //将results解构到findResult中
                for (var i=0;i<results.length;i++){
                    findResult.push({
                        catId:results[i].Cat_id,
                        catName:results[i].Cat_name
                    })
                }
                //将findResult返回
                resolve(findResult);
            }  
          })
    })
    
 }

 exports.findGoodsById = async function (catId) {
    return new Promise(async function (resolve,reject){
        var selectQuery = "SELECT * FROM goods,goods_cat WHERE goods.Goods_id = goods_cat.Goods_id AND Cat_id=?"
        await connection.query(selectQuery,[catId], function (error, results) {
            if (error) throw error;    
            else{
                var findResult = [];
                //将results解构到findResult中
                for (var i=0;i<results.length;i++){
                    findResult.push({
                        goodsId:results[i].Goods_id,
                        goodsName:results[i].Goods_name,
                        goodsPrice:[results[i].Goods_price_1 , results[i].Goods_price_2],
                        goodsOldPrice:results[i].Goods_oldPrice,
                        goodsStore:results[i].Goods_store,
                        goodsSold:results[i].Goods_sold,
                        goodsPics:JSON.parse(results[i].Goods_pics)
                    })
                }
                //将findResult返回
                // console.log(findResult)
                resolve(findResult);
                
                
                
            }  
          })
    })
 }