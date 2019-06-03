var GoodMapDecoder = require("GoodMapDecoder");

var MapDataMgr = cc.Class({
    extends: cc.Component,

    properties: {
        goodsMap:null,//示例
    
        decodeAll:0,
    },

    checkInitMapSuc:function(){
        if(this.decodeAll == 100)
        {
            //cc.log("数据解析完了");
        }
    },

    //初始化解析数据表
    initMaps:function () {
        //cc.log("开始解析数据了");
        cc.Mgr.Parse = false;
        this.goodsMap = new GoodMapDecoder();     
        var self = this; 
        this.decodeAll = 0;

        this.goodsMap.DecodeJson(function(result){
            if(result)
            {
                self.decodeAll +=100;
                //解析数据表根据有多少来扩展
                if(self.decodeAll == 100)
                {
                    cc.Mgr.Parse = true;
                    cc.director.GlobalEvent.emit(cc.Mgr.Event.ParseFinish, {});
                }
            }
        });
    },

    getDataByDataTypeAndId:function(itemType, itemId){
        var data = null;
        switch(itemType)
        { 
            case DataType.Goods:
                data = this.goodsMap.getDataByItemId(itemId);
                break;
        }
        return data;
    },

});
module.exports = MapDataMgr;
