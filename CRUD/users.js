/** 
 * 此处封装对db.json的数据库的增删改查CRUD的函数封装
 * 此处是对异步API的封装,这是nodejs的重点应用
 */
 
//查找数据函数
var fs = require('fs');

//将全局变量中的connection取出 s
let {connection} = global;

 exports.save =  function (user) {
    return new Promise(async function (resolve,reject){
        // console.log(user)
        const {id,  nickname,  avatar,  phone,  name,  address} = user;
        var selectSql = "select * from customer where Cus_id=?";
        //如果表中有此项数据,则无需再存储用户信息
        connection.query(selectSql,[id],function (error,results){
            //表中无此数据
            if (results.length <= 0) {
                var insertCustomerSql = "insert into customer(Cus_id,Cus_nickname,Cus_avatar,Cus_name,Cus_phone,Cus_address) VALUES(?,?,?,?,?,?)";
                connection.query(insertCustomerSql, [id,nickname,avatar,name,phone,address], function (error, results) {
                    if (error) throw error;   
                })
            }
                
        });        

    })
    
 }
