//将全局变量中的connection取出
let {connection} = global;

exports.find =  function (para) {
    return new Promise(async function (resolve,reject){
        //处理搜索字符串,对字符串加入百分号
        let query = para.replace(/ /g,'');
        let queryReal = '';
        for (let i=0;i<query.length;i++){
            queryReal=queryReal.concat('%'+query[i]);
        }
        queryReal=queryReal.concat('%');



        let selectGoodsSql = "SELECT Goods_id,Goods_name FROM goods WHERE Goods_name LIKE ?"
        await connection.query(selectGoodsSql,[queryReal],function (error,results){
            let goods=[];
            if (error) throw error;
            else{
                for (let i=0;i<results.length;i++){
                    goods.push({
                        goodsId:results[i].Goods_id,
                        goodsName:results[i].Goods_name
                    })
                }
                resolve(goods);
            }
        })
    })
}