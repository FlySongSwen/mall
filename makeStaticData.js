var fs = require('fs');

var data = {
    
    //轮播图数据
    swiperdata: [{
        "image_src": "https://s1.ax1x.com/2020/04/29/JTjkPH.jpg",
        "open_type": "navigate",
        "goods_id": 129,
        "navigator_url": "",
        "light": [
            [0, 2]
        ]
    }, {
        "image_src": "https://s1.ax1x.com/2020/04/29/JTjCVO.jpg",
        "open_type": "navigate",
        "goods_id": 395,
        "navigator_url": "",
        "light": [
            [0, 3]
        ]
    }, {
        "image_src": "https://s1.ax1x.com/2020/04/29/JTjPaD.jpg",
        "open_type": "navigate",
        "goods_id": 38,
        "navigator_url": "",
        "light": [
            [1, 1]
        ]
    }],
    //分类图数据
    catitems: [
        [{
            //第一行
            "catId":"1",
            "catName": "蔬菜",
            "image_src": "https://s1.ax1x.com/2020/04/29/JTXOPJ.png",
            "light": ""
        }, {
            "catId":"2",
            "catName": "肉类",
            "image_src": "https://s1.ax1x.com/2020/04/29/JTjSr6.png",
            "light": ""
        }, {
            "catId":"3",
            "catName": "禽蛋",
            "image_src": "https://s1.ax1x.com/2020/04/29/JTXj2R.png",
            "light": ""
        }, {
            "catId":"4",
            "catName": "牛奶",
            "image_src": "https://s1.ax1x.com/2020/04/29/JTXq54.png",
            "light": ""
        }],
        //第二行

        [{
            "catId":"5",
            "catName": "酒水",
            "image_src": "https://s1.ax1x.com/2020/04/29/JTXXG9.png",
            "light": ""
        }, {
            "catId":"6",
            "catName": "面包",
            "image_src": "https://s1.ax1x.com/2020/04/29/JTjpqK.png",
            "light": ""
        }, {
            "catId":"7",
            "catName": "水产",
            "image_src": "https://s1.ax1x.com/2020/04/29/JTXzKx.png",
            "light": ""
        }, {
            "catId":"8",
            "catName": "水果",
            "image_src": "https://s1.ax1x.com/2020/04/29/JTXvx1.png",
            "light": ""
        }]
    ],
    //楼层数据
    flooritems: {

        "left": {
            "name": "left01",
            "image_src": "https://p.pstatp.com/origin/ffba00013f6b75d7fe01",

            "open_type": "navigate",
            "navigator_url": "page/category/index"
        },
        "product_list": [{
                "name": "right01",
                "image_src": "https://s1.ax1x.com/2020/04/29/J7S9ld.png",

                "open_type": "navigate",
                "navigator_url": "page/category/index"
            },
            {
                "name": "right02",
                "image_src": "https://s1.ax1x.com/2020/04/29/JTjiIe.jpg",

                "open_type": "navigate",
                "navigator_url": "page/category/index"
            },
            {
                "name": "right03",
                "image_src": "https://imgservice.suning.cn/uimg1/b2c/atmosphere/jxDVjwcstCLbdMZoTG7KsA.jpg_800w_800h_4e",

                "open_type": "navigate",
                "navigator_url": "page/category/index"
            },
            {
                "name": "right04",
                "image_src": "https://imgservice.suning.cn/uimg1/b2c/atmosphere/GxrexoJ-ONVKKqR8eQEVjA.jpg_800w_800h_4e",

                "open_type": "navigate",
                "navigator_url": "page/category/index"
            },
        ]
    }

}

fs.writeFile('./staticData/home_data.json',JSON.stringify(data),function (error) {
    if (error)
        console.log("写入失败")
    else
        console.log('写入成功');
})   