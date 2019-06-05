var GoodsData = require("GoodsData");
var GoodMapDecoder = cc.Class({
    extends: cc.Component,

    properties: {
        jsonName:"goods",
        goodsList:{
            default:[],
            type:[GoodsData],
        },
    },

    //解析数据
    DecodeJson:function (event) {
        var self = this;
        self.reCb = event;
        cc.loader.loadRes("json/"+self.jsonName, function (error, obj) {
            if(error)
            {
                self.reCb(false);
                return;
            }
            
            var jsonRoot = obj.json.goods;
            for (var i = 0; i < jsonRoot.length; i++) {
                var goodsData = new GoodsData();
                goodsData.Id = jsonRoot[i].goodsId;
                goodsData.icon = jsonRoot[i].icon;
                goodsData.name = jsonRoot[i].name;
                goodsData.price = jsonRoot[i].price;
                self.goodsList[i] = goodsData; 
            }
            cc.log("解析完成");
            self.reCb(true);
        });
    },

    //通过名字拿到当前的数据 不建议用，你要用我也没办法
    getDataByName:function (name) {
        var data = null;
        for (var i = this.goodsList.length - 1; i >= 0; i--) {
            if(name == this.goodsList[i].name)
            {
                data = this.goodsList[i];
                break;
            }
        }
        return data;
    },

    //通过itemid获取数据
    getDataById:function(itemId){
        var data = null;
        for (var i = this.goodsList.length - 1; i >= 0; i--) {
            if(itemId == this.goodsList[i].Id)
            {
                data = this.goodsList[i];
                break;
            }
        }
        return data;
    },

    getJsonLength:function(){
        return this.goodsList.length
    },

    getDataList:function(){
        return this.goodsList;
    },
});
module.exports = GoodMapDecoder;
