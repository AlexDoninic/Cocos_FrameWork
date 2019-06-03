"use strict";
cc._RF.push(module, '6a8b6G2stdP2or3S5D9kQSx', 'ShareInfos');
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