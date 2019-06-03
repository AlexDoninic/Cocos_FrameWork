(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/platform/ShareInfos.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6a8b6G2stdP2or3S5D9kQSx', 'ShareInfos', __filename);
// scripts/platform/ShareInfos.js

"use strict";

var ShareInfos = cc.Class({
    extends: cc.Component,
    statics: {
        init: function init() {
            this.Infos = [{ text: "【有人@你】我在这个游戏里面挣了一个亿", url: "https://paopao.talkyun.com.cn/yiyi/1.jpg" }];
        },

        getShareInfos: function getShareInfos(index) {
            return this.Infos[index];
        }
    }
});
module.exports = ShareInfos;

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
        //# sourceMappingURL=ShareInfos.js.map
        