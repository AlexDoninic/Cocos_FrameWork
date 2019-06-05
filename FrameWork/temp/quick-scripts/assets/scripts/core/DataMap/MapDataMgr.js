(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/core/DataMap/MapDataMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4cf54GTOt5F3rbUgATuyqq9', 'MapDataMgr', __filename);
// scripts/core/DataMap/MapDataMgr.js

"use strict";

var GoodMapDecoder = require("GoodMapDecoder");
var DataType = require("DataType");
var MapDataMgr = cc.Class({
    extends: cc.Component,

    properties: {
        goodsMap: null, //示例

        decodeAll: 0
    },

    checkInitMapSuc: function checkInitMapSuc() {
        if (this.decodeAll == 100) {
            //cc.log("数据解析完了");
        }
    },

    //初始化解析数据表
    initMaps: function initMaps() {
        //cc.log("开始解析数据了");
        cc.Mgr.Parse = false;
        this.goodsMap = new GoodMapDecoder();
        var self = this;
        this.decodeAll = 0;

        this.goodsMap.DecodeJson(function (result) {
            if (result) {
                self.decodeAll += 100;
                //解析数据表根据有多少来扩展
                if (self.decodeAll == 100) {
                    cc.Mgr.Parse = true;
                    cc.director.GlobalEvent.emit(cc.Mgr.Event.ParseFinish, {});
                }
            }
        });
    },

    getDataByDataTypeAndId: function getDataByDataTypeAndId(itemType, itemId) {
        var data = null;
        switch (itemType) {
            case DataType.Goods:
                data = this.goodsMap.getDataByItemId(itemId);
                break;
        }
        return data;
    }

});
module.exports = MapDataMgr;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MapDataMgr.js.map
        